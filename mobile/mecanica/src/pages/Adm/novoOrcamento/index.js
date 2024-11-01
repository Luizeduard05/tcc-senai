import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import CheckBox from "expo-checkbox";
import { Picker } from '@react-native-picker/picker';
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api/api";
import { useEffect, useState } from "react";

export default function NovoOrcamentoADM() {
    const { token } = useAuth();
    const [email, setEmail] = useState("luiz@gmail.com");
    const [idCliente, setIdCliente] = useState(); // Capturando id do cliente para usar na requisição
    const [carros, setCarros] = useState([]); // Carros do cliente
    const [idCarroSelecionado, setIdCarroSelecionado] = useState(null); // Carro selecionado para orçamento
    const [pecas, setPecas] = useState([]); // Variavel para armazenar pecas do estoque
    const [pecasSelecionadas, setPecasSelecionadas] = useState([]) // Variavel para armazenar peças usadas no orçamento

    const [data, setData] = useState("")
    const status = "Aguardando Retorno"
    const [mo, setMo]= useState("")

    console.log(pecas)
    console.log(`id ${idCarroSelecionado}` )

    const getCliente = async () => { // Requisição para buscar o cliente
        try {
            const response = await api.get(`/usuario/email/${email}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            // console.log(response.data.person);
            setIdCliente(response.data.person.pessoa_id)
            console.log(response.data.person.pessoa_id)
        } catch (error) {
            console.log(error)
        }
    }

    const getCarros = async () => { // Requisição para trazer os carros do cliente
        try {
            const response = await api.get(`/veiculos/${idCliente}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data)
            setCarros(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getPecas = async () => { // Requisição para busca de peças no orcamento
        try {
            const response = await api.get("/pecas", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data)
            setPecas(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const postOS = async () => { // Requisição para cadastro de um novo orçamento
        try {
            const response = await api.post("/os", {
                data: data,
                status: status,
                mo: mo,
                itens: pecasSelecionadas
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                params: {
                    idVei : idCarroSelecionado,
                    idPessoaVei: idCliente
                }
            }
        )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { // Toda vez que o id do cliente é setado a bsuca por carros é chamada
        getCarros()
        getPecas()
    }, [idCliente])

    const togglePecaSelection = (pecaId) => { // Função marcar e desmarcar peças selecionadas
        setPecasSelecionadas((prevSelecionadas) => { // Atualiza o estado 'pecasSelecionadas' com base na seleção atual
            if (prevSelecionadas.includes(pecaId)) { // Verifica se o ID da peça já está na lista de peças selecionadas
                return prevSelecionadas.filter((id) => id !== pecaId);  // Se o ID já estiver na lista, cria uma nova lista sem esse ID, removendo a peça da seleção
            } else { // Se o ID não estiver na lista, adiciona o ID à lista, mantendo a peça selecionada
                return [...prevSelecionadas, pecaId];
            }
        });
    };


    return (
        <LinearGradient
            colors={['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}
        >
            <View style={styles.container}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Buscar cliente:</Text>
                    <TextInput style={styles.input} placeholder="Digite o email do cliente" value={email} onChangeText={setEmail} />

                    <TouchableOpacity onPress={getCliente}>
                        <Text>Buscar usuario</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Selecionar Veículo:</Text>
                    <Picker
                        selectedValue={idCarroSelecionado}
                        onValueChange={(itemValue) => setIdCarroSelecionado(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Selecione um veículo" value={null} />
                        {carros.map((carro) => (
                            <Picker.Item
                                key={carro.id}
                                label={`${carro.modelo} - ${carro.placa}`}
                                value={carro.id}
                            />
                        ))}
                    </Picker>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Selecionar Peças:</Text>
                    <FlatList
                        data={pecas}
                        keyExtractor={(peca) => peca.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.pecaItem}>
                                <CheckBox
                                    value={pecasSelecionadas.includes(item.id)}
                                    onValueChange={() => togglePecaSelection(item.id)}
                                />
                                <Text style={styles.pecaLabel}>{item.nome_produto} - R$ {item.valor_produto}</Text>
                            </View>
                        )}
                    />
                </View>


                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Data:</Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Mão de Obra:</Text>
                    <TextInput style={styles.input} />
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
        height: '80%',
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
    inputGroup: {
        width: '90%',
        marginBottom: 15,
    },
    label: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#fff",
        width: "100%",
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    btnConfirmar: {
        width: "90%",
        height: 50,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    btnCancelar: {
        width: "90%",
        height: 50,
        backgroundColor: "#FF0000",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    textBtnCancelar: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    textBtn: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
    },
});
