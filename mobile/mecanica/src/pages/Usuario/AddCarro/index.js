import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TextInput, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import api from "../../../services/api/api";

export default function AddCarro() {
    const { id, token } = useAuth();
    const [veiculos, setVeiculos] = useState([]);

    // Variaveis para cadastro de veiculo
    const [placa, setPlaca] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState("");

    const [isEditing, setIsEditing] = useState(false); // estado para controlar o modo de edição

    // Variaveis para edicao de veiculo
    const [placaEdit, setPlacaEdit] = useState("")
    const [marcaEdit, setMarcaEdit] = useState("")
    const [modeloEdit, setModeloEdit] = useState("");
    const [anoEdit, setAnoEdit] = useState("");

    const [modalVisible, setModalVisible] = useState(false); // Manipulando o Modal
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null); // Variavel para capturar o veiculo selecionado

    const getVeiculos = async () => {
        try {
            const response = await api.get(`/veiculos/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            // console.log(response.data.person);
            setVeiculos(response.data.person)
        } catch (error) {
            console.log(error)
        }
    }

    const postVeiculo = async () => {
        try {
            const response = await api.post(
                `/veiculos/${id}`,
                {
                    placa: placa,
                    marca: marca,
                    modelo: modelo,
                    ano: ano
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            //    console.log(response.data) 
            setPlaca("");
            setMarca("");
            setModelo("");
            setAno("");
            alert(`Veiculo ${modelo} cadastrado com sucesso`)
            getVeiculos()

        } catch (error) {
            console.log(error)
            alert("Ocorreu um erro")
        }
    }

    const deleteVeiculo = async () => { // Requisicao para exlusao de veiculo
        try {
            const response = await api.delete(`/veiculos/${veiculoSelecionado.id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setModalVisible(false);
            getVeiculos()
        } catch (error) {
            console.log(error)
        }
    }

    const confirmDelete = (veiculo) => { // Confirmacao de exclusao
        setVeiculoSelecionado(veiculo);
        setModalVisible(true);
    };

    const editVeiculo = async () => {  // Requisicao para edicao de veiculo
        try {
            const response = await api.put(
                `/veiculos/${veiculoSelecionado.id}`,
                {
                    placa: placaEdit,
                    marca: marcaEdit,
                    modelo: modeloEdit,
                    ano: anoEdit
                },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            )

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getVeiculos()
    }, [])

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Cadastro de Veículo</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Placa"
                        placeholderTextColor="#cccccc"
                        value={placa}
                        onChangeText={setPlaca}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Marca do veículo"
                        placeholderTextColor="#cccccc"
                        value={marca}
                        onChangeText={setMarca}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Modelo"
                        placeholderTextColor="#cccccc"
                        value={modelo}
                        onChangeText={setModelo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ano"
                        placeholderTextColor="#cccccc"
                        value={ano}
                        onChangeText={setAno}
                    />

                    <TouchableOpacity style={styles.button} onPress={postVeiculo}>
                        <Text style={styles.buttonText}>Cadastrar Veículo</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subTitle}>Seus Veículos</Text>

                {veiculos && veiculos.length > 0 ? (
                    veiculos.map((veiculo) => (
                        <View style={styles.vehicleList} key={veiculo.id}>
                            <Text style={styles.vehicleItem}>{veiculo.modelo} - {veiculo.placa}</Text>
                            <TouchableOpacity onPress={() => confirmDelete(veiculo)}>
                                <FontAwesome name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text>Nenhum veículo cadastrado</Text>
                )}

                {/* Modal de confirmação */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Deseja realmente excluir o veículo?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButton} onPress={deleteVeiculo}>
                                    <Text style={styles.modalButtonText}>Sim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.modalButtonText}>Não</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        flexGrow: 1,
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 20,
    },
    form: {
        width: "100%",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        color: "#ffffff",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#FF4500",
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
    },
    vehicleList: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 8,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    vehicleItem: {
        color: "#ffffff",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    modalButton: {
        backgroundColor: "#FF4500",
        padding: 10,
        borderRadius: 8,
        width: "40%",
        alignItems: "center",
    },
    modalButtonText: {
        color: "#ffffff",
        fontSize: 16,
    },
});