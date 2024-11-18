import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TextInput, TouchableOpacity, FlatList, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api/api";
import { useEffect, useState } from "react";

export default function NovoOrcamentoADM() {
    const { token } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);

    const [clientes, setClientes] = useState([]) // Variavel para guardar todos clientes
    const [clienteSelecionado, setClienteSelecionado] = useState(null); // Variavel para armazenar cliente selecionado
    const [veiculosCliente, setVeiculosCliente] = useState([]); // Variavel para armazenar todos veiculos que um cliente possui
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null); // Variavel para armazenar o carro selecionado para agendamento
    const [pecas, setPecas] = useState([]); // Variavel para armazenar pecas do estoque
    const [mecanicos, setMecanicos] = useState([]) // Variavel para guardar todos mecanicos
    const [mecanicoSelecionado, setMecanicoSelecionado] = useState(null); // Variavel para armazenar cliente selecionado

    const [data, setData] = useState("") // Variavel para guardar a data que sera usada na requisição
    const status = "Aguardando Retorno"  // Variavel para guardar o status que sera usado na requisição
    const [mo, setMo] = useState("") // Variavel para guardar a mo inicial
    const [pecasSelecionadas, setPecasSelecionadas] = useState([]); // Variavel para guardar as pecas que serao enviadas a requisicao


    const getUsuarios = async () => { // Requisição para trazer todos usuarios que possui no sistema
        try {
            const response = await api.get(`/todosUser`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const clientesFiltrados = response.data.result.filter(usuario => usuario.tipo === 'CLI'); // Filtrando apenas os que sao clientes
            setClientes(clientesFiltrados);

            const mecanicosFiltrados = response.data.result.filter(usuario => usuario.tipo === 'MEC'); // Filtrando apenas os que são mecanicos
            setMecanicos(mecanicosFiltrados)
        } catch (error) {
            console.log(error);
        }
    };

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
            console.log(`PECAS ${response.data.pecas}`)
            setPecas(response.data.pecas)

            const pecasTransformadas = response.data.pecas.map((peca) => ({
                id: peca.id, // mapeando a propriedade id
                nome_produto: peca.nome_produto, // mapeando nome
                valor_produto: Number(peca.valor_produto).toFixed(2), // Convertendo o valor para string com 2 casas decimais
            }));

            console.log(pecasTransformadas)
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

        // console.log(itensOrçamento)
        console.log(mecanicoSelecionado)
        const body = {
            data: data,
            status: status,
            mo: formatMo(mo) , // Pegando o total mais a mao de obra
            itens: itensOrçamento,
            mecanico: mecanicoSelecionado.pessoa_id,
            total: Number(total()) 
        }
        console.log(body.total)

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

            alert("Orçamento criado com sucesso:", response.data)
            // Limpando os campos
            setEmail("")
            setVeiculoSelecionado(null)
            setPecasSelecionadas([])
            setData("")
            setMo("")

        } catch (error) {
            console.log(error)
            console.log(clienteSelecionado)
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

    // const total = () => { // Função para somar a mão de obra e as pecas
    //     const totalPecas = pecasSelecionadas.reduce((acc, peca) => {
    //         return acc + (peca.valor_produto * peca.quantidade);
    //     }, 0);
    //     const maoDeObra = Number(mo);
    //     const valorFinal = totalPecas + maoDeObra;
    //     const valorEditado = valorFinal.toFixed(2);
    //     const valorFinalString = valorEditado.toString()
    //      return valorFinalString
    // }

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
            <View style={styles.container}>

                <View style={styles.inputGroup}>
                    <Picker
                        selectedValue={clienteSelecionado}
                        onValueChange={(itemValue) => setClienteSelecionado(itemValue)}
                    >
                        <Picker.Item label="Selecione um cliente" value={null} />
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
                    {pecasSelecionadas.length > 0 && (
                        <>
                            <Text style={styles.label}>Selecionar o mecanico:</Text>
                            <Picker
                                selectedValue={mecanicoSelecionado}
                                style={styles.picker}
                                onValueChange={(itemValue) => setMecanicoSelecionado(itemValue)}
                            >
                                <Picker.Item label="Selecione o mecanico" value={null} />
                                {mecanicos.map(mecanico => (
                                    <Picker.Item key={mecanico.pessoa_id} label={`${mecanico.nome} - ${mecanico.cpf}`} value={mecanico} />
                                ))}
                            </Picker>
                        </>
                    )}

                </View>

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
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: "center",
    },
    inputGroup: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 8,
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 10,
    },
    pecaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C2C2C',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    pecaLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        flex: 2,
        paddingLeft: 10,
    },
    pecaQuantity: {
        color: "#ffffffcc",
        fontSize: 14,
        fontWeight: "400",
        paddingHorizontal: 10,
        textAlign: "center",
    },
    quantityControl: {
        fontSize: 20,
        color: "#FFF",
        backgroundColor: "#555",
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 8,
        textAlign: "center",
        marginHorizontal: 5,
        elevation: 3,
    },
    removeText: {
        color: "#FF4444",
        fontSize: 14,
        fontWeight: "600",
        padding: 8,
        backgroundColor: "#2C2C2C",
        borderRadius: 5,
        marginLeft: 10,
        shadowColor: '#FF4444',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    btnAdicionarPeca: {
        width: "90%",
        height: 45,
        backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    textBtn: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "600",
    },
    btnConfirmar: {
        width: "90%",
        height: 50,
        backgroundColor: "#007BFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    btnCancelar: {
        width: "90%",
        height: 50,
        backgroundColor: "#FF4444",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalCloseButton: {
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FF4444',
        borderRadius: 8,
    },
    pecaModalItem: {
        fontSize: 16,
        color: 'black',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});

