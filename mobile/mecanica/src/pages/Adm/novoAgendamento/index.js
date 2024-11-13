import { LinearGradient } from "expo-linear-gradient";
import { Platform, StatusBar, StyleSheet, View, Text, Button, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api/api";
import { useEffect, useState } from "react";

export default function NovoAgendamento() {
    const { token } = useAuth();

    const [clientes, setClientes] = useState([]); // Variavel para armazenar todos clientes que possui no sistema
    const [clienteSelecionado, setClienteSelecionado] = useState(null); // Variavel para armazenar cliente selecionado
    const [veiculosCliente, setVeiculosCliente] = useState([]); // Variavel para armazenar todos veiculos que um cliente possui
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null); // Variavel para armazenar o carro selecionado para agendamento

    // Campos do forms
    const [dataHora, setDataHora] = useState("");
    const [observacao, setObservacao] = useState("");

    const getUsuarios = async () => { // Requisição para trazer todos usuarios que possui no sistema
        try {
            const response = await api.get(`/todosUser`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const clientesFiltrados = response.data.result.filter(usuario => usuario.tipo === 'CLI'); // Filtrando apenas os que sao clientes
            setClientes(clientesFiltrados);
        } catch (error) {
            console.log(error);
        }
    };

    const getVeiculos = async (pessoaId) => { // Requisição de busca de veiculo a partir do id do usuario selecionado
        try {
            const response = await api.get(`/veiculos/${pessoaId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setVeiculosCliente(response.data.person);
        } catch (error) {
            console.log(error);
        }
    };

    const postAgendamento = async () => {// Requisição para cadastrar o agendamento
        try {
            const response = await api.post("/agendar",
                {
                    data_e_hora: dataHora,
                    observacao: observacao,
                    idVeiOs: veiculoSelecionado.id,
                    idPessoaVeiOs: clienteSelecionado.pessoa_id,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    },
                }
            );
            console.log("Agendamento realizado com sucesso:", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {  // Trazendo os usuarios cadastrados na inicialzação da pagina
        getUsuarios();
    }, []);

    useEffect(() => { // Monitorando para quando o cliente for setado trazer os dados de veiculos
        if (clienteSelecionado) {
            getVeiculos(clienteSelecionado.pessoa_id);
        }
    }, [clienteSelecionado]);

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.headerText}>Novo Agendamento</Text>
                    <Text style={styles.label}>Selecione o Cliente</Text>
                    <Picker
                        selectedValue={clienteSelecionado}
                        style={styles.picker}
                        onValueChange={(itemValue) => setClienteSelecionado(itemValue)}
                    >
                        <Picker.Item label="Selecione um cliente" value={null} />
                        {clientes.map(cliente => (
                            <Picker.Item key={cliente.pessoa_id} label={`${cliente.nome} - ${cliente.cpf}`} value={cliente} />
                        ))}
                    </Picker>

                    {clienteSelecionado && (
                        <>
                            <Text style={styles.label}>Selecione o Veículo</Text>
                            <Picker
                                selectedValue={veiculoSelecionado}
                                style={styles.picker}
                                onValueChange={(itemValue) => setVeiculoSelecionado(itemValue)}
                            >
                                <Picker.Item label="Selecione um veículo" value={null} />
                                {veiculosCliente.map(veiculo => (
                                    <Picker.Item key={veiculo.id} label={`${veiculo.modelo} - ${veiculo.placa}`} value={veiculo} />
                                ))}
                            </Picker>
                        </>
                    )}

                    <Text style={styles.label}>Data e Hora</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="MM-DD-AAAA HH:MM"
                        placeholderTextColor="#999"
                        value={dataHora}
                        onChangeText={setDataHora}
                    />

                    <Text style={styles.label}>Observação *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Digite uma observação"
                        placeholderTextColor="#999"
                        value={observacao}
                        onChangeText={setObservacao}
                        multiline
                    />

                    <View style={styles.buttonContainer}>
                        <Button color="#d32f2f" title="Agendar" onPress={postAgendamento} />
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#d32f2f',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        backgroundColor: '#2e2e2e',
        borderRadius: 10,
        padding: 15,
        paddingBottom: 25,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 8,
    },
    picker: {
        color: '#fff',
        backgroundColor: '#444',
        borderRadius: 5,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#444',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 15,
        borderRadius: 5,
        overflow: 'hidden',
    },
});
