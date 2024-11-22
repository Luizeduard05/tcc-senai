import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TextInput, TouchableOpacity, ScrollView, Modal , FlatList} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import api from "../../../services/api/api";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from 'react-native-mask-text';

export default function NovoOrcamentoMecanico() {
    const {token, id} = useAuth();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const [clientes, setClientes] = useState([]) // Variavel para guardar todos clientes
    const [clienteSelecionado, setClienteSelecionado] = useState(null); // Variavel para armazenar cliente selecionado
    const [veiculosCliente, setVeiculosCliente] = useState([]); // Variavel para armazenar todos veiculos que um cliente possui
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null); // Variavel para armazenar o carro selecionado para agendamento
    const [pecas, setPecas] = useState([]); // Variavel para armazenar pecas do estoque
    const [mecanicoSelecionado, setMecanicoSelecionado] = useState(null); // Variavel para armazenar mecanico selecionado
    // const mecanico = mecanicoSelecionado[0];

    const [data, setData] = useState("") // Variavel para guardar a data que sera usada na requisição
    const status = "Aguardando Retorno"  // Variavel para guardar o status que sera usado na requisição
    const [mo, setMo] = useState("") // Variavel para guardar a mo inicial
    const [pecasSelecionadas, setPecasSelecionadas] = useState([]); // Variavel para guardar as pecas que serao enviadas a requisicao

    const navegaOrcamento = () => {
        navigation.navigate("HistoricoMecanico")
    }

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

    const getMecanico = async () => { // Requisição para capturar o mecanico
        try {
            const response = await api.get(`/usuario/${id}`, {
                headers: {
                    Authorization: `TOKEN ${token}`
                }
            })
            // console.log(response.data.result)
            setMecanicoSelecionado(response.data.result);
        } catch (error) {
            console.log(error)
        }
    }

    const getCarros = async (pessoaId) => { // Requisição para trazer os carros do cliente
        try {
            const response = await api.get(`/veiculos/${pessoaId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            // console.log(response.data.person)
            setVeiculosCliente(response.data.person)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMecanico();
        getUsuarios();
        getPecas();
    }, [])

    useEffect(() => {
        if (clienteSelecionado) {
            getCarros(clienteSelecionado.pessoa_id)

        }
    }, [clienteSelecionado])

    const getPecas = async () => { // Requisição para busca de peças no orcamento
        try {
            const response = await api.get("/todasPecas", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            // console.log(`PECAS ${response.data.pecas}`)
            setPecas(response.data.pecas)

            const pecasTransformadas = response.data.pecas.map((peca) => ({
                id: peca.id, // mapeando a propriedade id
                nome_produto: peca.nome_produto, // mapeando nome
                valor_produto: Number(peca.valor_produto).toFixed(2), // Convertendo o valor para string com 2 casas decimais
            }));

            // console.log(pecasTransformadas)
        } catch (error) {
            console.log(error)
        }
    }

    const formatMo = (valor) => valor.replace('.', ',');

    const postOS = async () => { // Requisição para cadastro de um novo orçamento
        const itensOrçamento = pecasSelecionadas.map(item => {
            const valorNumber = Number(item.valor_produto); // Convertendo para Number
            return {
                id_produto: item.id,
                quantidade: item.quantidade,
                valor: item.quantidade * valorNumber // Multiplicando a quantidade pelo valor
            };
        });
        const mecanico = mecanicoSelecionado[0];
        // console.log(mecanico)
        const body = {
            data: data,
            status: status,
            mo: formatMo(mo), // Pegando o total mais a mao de obra
            itens: itensOrçamento,
            mecanico: mecanico.pessoa_id,
            total: Number(total())
        }
        try {
            const response = await api.post("/os", body,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    },
                    params: {
                        idVei: veiculoSelecionado,
                        idPessoaVei: clienteSelecionado.pessoa_id
                    }
                },
            )
            // alert("Orçamento criado com sucesso:", response.data)
            // Limpando os campos
            setClienteSelecionado(null)
            setVeiculoSelecionado(null)
            setPecasSelecionadas([])
            setData("")
            setMo("")
            navegaOrcamento("")

        } catch (error) {
            console.log(error)
            alert("Ocorreu um erro")
        }
    }

    const handleSelectPeca = (peca) => { // Função para adicao de peca na lista de orcamento
        const existingPeca = pecasSelecionadas.find(item => item.id === peca.id);
        if (existingPeca) { // Se a peça já existe, aumenta a quantidade
            setPecasSelecionadas(pecasSelecionadas.map(item =>
                item.id === peca.id ? { ...item, quantidade: item.quantidade + 1 } : item
            ));
        } else {    // Adiciona uma nova peça com quantidade 1
            setPecasSelecionadas([...pecasSelecionadas, { ...peca, quantidade: 1 }]);
        }
        setModalVisible(false);
    };

    const handleRemovePeca = (index) => { // Função para remover peca na lista de orcamento
        const updatedPecas = pecasSelecionadas.filter((_, i) => i !== index);
        setPecasSelecionadas(updatedPecas);
    };

    const handleIncreaseQuantity = (index) => { // Função para adicionar quantidade de peca na lista de orcamento
        const updatedPecas = [...pecasSelecionadas];
        updatedPecas[index].quantidade += 1;
        setPecasSelecionadas(updatedPecas);
    };

    const handleDecreaseQuantity = (index) => { // Função para remover quantidade de peca na lista de orcamento
        const updatedPecas = [...pecasSelecionadas];
        if (updatedPecas[index].quantidade > 1) {
            updatedPecas[index].quantidade -= 1;
            setPecasSelecionadas(updatedPecas);
        }
    };

    const total = () => {
        const totalPecas = pecasSelecionadas.reduce((acc, peca) => {
            return acc + (peca.valor_produto * peca.quantidade);
        }, 0);
        const maoDeObra = Number(mo);
        const valorFinal = totalPecas + maoDeObra;
        return valorFinal.toFixed(2); // Retorna como string com 2 casas decimais
    }


    return (
        <LinearGradient
            colors={['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>

                    <View style={styles.inputGroup}>
                        <Picker
                            selectedValue={clienteSelecionado}
                            onValueChange={(itemValue) => setClienteSelecionado(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Selecione um cliente" value={null} style={styles.label} />
                            {clientes.map(cliente => (
                                <Picker.Item key={cliente.pessoa_id} label={`${cliente.nome} - ${cliente.cpf}`} value={cliente} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.inputGroup}>
                        {clienteSelecionado && (
                            <>
                                <Text style={styles.label}>Selecionar Veículo:</Text>
                                <Picker
                                    selectedValue={veiculoSelecionado}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setVeiculoSelecionado(itemValue)}
                                >
                                    <Picker.Item label="Selecione um veículo" value={null} />
                                    {veiculosCliente.map(veiculo => (
                                        <Picker.Item key={veiculo.id} label={`${veiculo.modelo} - ${veiculo.placa}`} value={veiculo.id} />
                                    ))}
                                </Picker>
                            </>
                        )}

                    </View>

                    <View style={styles.inputGroup}>
                        {veiculoSelecionado && (
                            <>
                                <Text style={styles.label}>Peças Selecionadas:</Text>
                                <FlatList
                                    data={pecasSelecionadas}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.pecaItem}>
                                            <Text style={styles.pecaLabel}>{item.nome_produto} - {item.valor_produto}</Text>
                                            <Text style={styles.pecaQuantity}>Quantidade: {item.quantidade}</Text>
                                            <TouchableOpacity onPress={() => handleIncreaseQuantity(index)}>
                                                <Text style={styles.quantityControl}>+</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDecreaseQuantity(index)}>
                                                <Text style={styles.quantityControl}>-</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleRemovePeca(index)}>
                                                <Text style={styles.removeText}>Remover</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btnAdicionarPeca}>
                                    <Text style={styles.textBtn}>Adicionar Peça</Text>
                                </TouchableOpacity>
                            </>
                        )}

                    </View>

                    <Modal visible={modalVisible} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <FlatList
                                    data={pecas}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleSelectPeca(item)}>
                                            <Text style={styles.pecaModalItem}>{item.nome_produto} - {item.valor_produto}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                                    <Text style={styles.textBtnCancelar}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Data:</Text>
                        <TextInput style={styles.input} value={data} onChangeText={setData} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mão de Obra:</Text>
                        <TextInput style={styles.input} value={mo} onChangeText={setMo} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Total:</Text>
                        <TextInput
                            style={styles.input}
                            value={total().toString()}
                            editable={false}
                        />
                    </View>

                    <TouchableOpacity style={styles.btnConfirmar} onPress={postOS} >
                        <Text style={styles.textBtn}>Confirmar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnCancelar}>
                        <Text style={styles.textBtnCancelar}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        justifyContent: "center",
        margin: 20,
        height: '100%',
        backgroundColor: "#383838",
        borderRadius: 10,
        alignItems: "center",
        elevation: 7,
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    scrollView: {
        paddingBottom: 20,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    label: {
        color: "#e0e0e0",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    input: {
        height: 45,
        backgroundColor: '#2c2c2e',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#444',
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        backgroundColor: '#2c2c2e',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 45,
        fontSize: 16,
    },
    pecaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3a3a3c',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    pecaLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        flex: 2,
    },
    pecaQuantity: {
        color: "#a8a8a8",
        fontSize: 14,
        textAlign: "center",
    },
    quantityControl: {
        fontSize: 18,
        color: "#FFF",
        backgroundColor: "#444",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: "center",
        marginHorizontal: 5,
        elevation: 3,
    },
    removeText: {
        color: "#FF4444",
        fontSize: 14,
        fontWeight: "500",
        padding: 8,
        backgroundColor: "#3a3a3c",
        borderRadius: 5,
        marginLeft: 10,
    },
    btnAdicionarPeca: {
        width: "90%",
        height: 50,
        backgroundColor: "#28a745",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    textBtn: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "600",
    },
    btnConfirmar: {
        width: "90%",
        height: 50,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    btnCancelar: {
        width: "90%",
        height: 50,
        backgroundColor: "#dc3545",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    textBtnCancelar: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "600",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalCloseButton: {
        marginTop: 15,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#dc3545',
        borderRadius: 8,
    },
    pecaModalItem: {
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});
