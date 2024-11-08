import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TextInput, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import api from "../../../services/api/api";
import { validaAno, validaMarca, validaNome, validaPlaca } from "../../../utils/inputValidation";

export default function AddCarro() {
    const { id, token } = useAuth();
    const [veiculos, setVeiculos] = useState([]);  // Variaveis para guardar os veiculos do usuario
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null); // Variavel para capturar o veiculo clicado

    // Variaveis para cadastro de veiculo
    const [placa, setPlaca] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState("");

    // Variaveis para edicao de veiculo
    const [placaEdit, setPlacaEdit] = useState("")
    const [marcaEdit, setMarcaEdit] = useState("")
    const [modeloEdit, setModeloEdit] = useState("");
    const [anoEdit, setAnoEdit] = useState("");

    // Manipulando os Modals
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // Variaveis responsavel por retornar o erro de validação dos inputs
    const [PlacaError, setPlacaError] = useState(null);
    const [marcaError, setMarcaError] = useState(null);
    const [modeloError, setModeloError] = useState(null);
    const [anoError, setAnoError] = useState(null);

    const getVeiculos = async () => { // Requisicao para trazer os veiculos do usuario
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

    const postVeiculo = async () => { // Requisicao para adicionar um novo veiculo ao usuario
        // Validando campos antes de enviar para a API
        const placaValidationError = validaPlaca(placa);
        const marcaValidationError = validaMarca(marca);
        const modeloValidationError = validaNome(modelo);
        const anoValidationError = validaAno(ano);

        // Atualizando os estados com as mensagens de erro da validação
        setPlacaError(placaValidationError);
        setMarcaError(marcaValidationError);
        setModeloError(modeloValidationError);
        setAnoError(anoValidationError);

        if (placaValidationError || marcaValidationError || modeloValidationError || anoValidationError) { // Caso ocorra erro de validação interompe o cadastro
            return;
        }

        try {
            await api.post(
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
            // Limpando campos apos requisicao
            setPlaca("");
            setMarca("");
            setModelo("");
            setAno("");
            getVeiculos() // Atualizando lista de veiculos apos insercao
        } catch (error) {
            console.log(error)
            alert("Ocorreu um erro")
        }
    }

    const deleteVeiculo = async () => { // Requisicao para exlusao de veiculo
        try {
            await api.delete(`/veiculos/${veiculoSelecionado.id}`, {
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

    const editVeiculo = async () => { // Requisicao para editar veiculo
        try {
            await api.put(
                `/veiculos/${veiculoSelecionado.id}`,
                {
                    placa: placaEdit,
                    marca: marcaEdit,
                    modelo: modeloEdit,
                    ano: anoEdit
                },
                { headers: { Authorization: `Token ${token}` } }
            );
            setEditModalVisible(false);
            getVeiculos(); // Atualizando a lista de veiculos apos edicao
        } catch (error) {
            console.log(error);
        }
    };

    const confirmEdit = (veiculo) => { // Botao de para ativar modal de edicao de dados do veiculo
        // Atribuindo os valores do veiculo selecionado ao modal de edicao
        setVeiculoSelecionado(veiculo);
        setPlacaEdit(veiculo.placa);
        setMarcaEdit(veiculo.marca);
        setModeloEdit(veiculo.modelo);
        setAnoEdit(veiculo.ano);
        setEditModalVisible(true); // Ativando modal de edicao
    };

    useEffect(() => {
        getVeiculos()
    }, [])

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Cadastro de Veículo</Text>

                <View style={styles.form}>
                    <TextInput
                        style={[styles.input, PlacaError ? styles.inputError : null]}
                        placeholder="Placa"
                        placeholderTextColor="#cccccc"
                        onChangeText={(text) => {
                            setPlaca(text);
                            setPlacaError(null); // Limpando o erro para proxima tentativa
                        }}
                        value={placa}
                        maxLength={7}
                    />
                    {PlacaError && <Text style={styles.errorText}>{PlacaError}</Text>}

                    <TextInput
                        style={[styles.input, marcaError ? styles.inputError : null]}
                        placeholder="Marca do veículo"
                        placeholderTextColor="#cccccc"
                        value={marca}
                        onChangeText={(text) => {
                            setMarca(text);
                            setMarcaError(null); // Limpando o erro para proxima tentativa
                        }}
                        maxLength={15}
                    />
                    {marcaError && <Text style={styles.errorText}>{marcaError}</Text>}

                    <TextInput
                        style={[styles.input, modeloError ? styles.inputError : null]}

                        placeholder="Modelo"
                        placeholderTextColor="#cccccc"
                        value={modelo}
                        onChangeText={(text) => {
                            setModelo(text);
                            setModeloError(null); // Limpando o erro para proxima tentativa
                        }}
                        maxLength={25}
                    />
                    {modeloError && <Text style={styles.errorText}>{modeloError}</Text>}

                    <TextInput
                        style={[styles.input, anoError ? styles.inputError : null]}

                        placeholder="Ano"
                        placeholderTextColor="#cccccc"
                        value={ano}
                        onChangeText={(text) => {
                            setAno(text);
                            setAnoError(null); // Limpando o erro para proxima tentativa
                        }}
                        maxLength={4}
                    />
                    {anoError && <Text style={styles.errorText}>{anoError}</Text>}

                    <TouchableOpacity style={styles.button} onPress={postVeiculo}>
                        <Text style={styles.buttonText}>Cadastrar Veículo</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subTitle}>Seus Veículos</Text>

                {/* Lista de Veículos */}
                {veiculos && veiculos.length > 0 ? (
                    veiculos.map((veiculo) => (
                        <View style={styles.vehicleList} key={veiculo.id}>
                            <Text style={styles.vehicleItem}>{veiculo.modelo} - {veiculo.placa}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => confirmEdit(veiculo)}>
                                    <FontAwesome name="pencil" size={24} color="blue" style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => confirmDelete(veiculo)}>
                                    <FontAwesome name="trash" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
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

                {/* Modal de Edição */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={() => setEditModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setEditModalVisible(false)}>
                                <FontAwesome name="close" size={24} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.modalText}>Editar Veículo</Text>
                            <Text style={styles.vehicleItem}>Placa</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Placa"
                                placeholderTextColor="#cccccc"
                                value={placaEdit}
                                onChangeText={setPlacaEdit}
                                maxLength={7}
                            />
                            <Text style={styles.vehicleItem}>Marca</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Marca"
                                placeholderTextColor="#cccccc"
                                value={marcaEdit}
                                onChangeText={setMarcaEdit}
                                maxLength={15}
                            />
                            <Text style={styles.vehicleItem}>Modelo</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Modelo"
                                placeholderTextColor="#cccccc"
                                value={modeloEdit}
                                onChangeText={setModeloEdit}
                                maxLength={25}
                            />
                            <Text style={styles.vehicleItem}>Ano</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Ano"
                                placeholderTextColor="#cccccc"
                                value={anoEdit}
                                onChangeText={setAnoEdit}
                                keyboardType="numeric"
                                maxLength={4}
                            />

                            <TouchableOpacity style={styles.button} onPress={editVeiculo}>
                                <Text style={styles.buttonText}>Salvar Alterações</Text>
                            </TouchableOpacity>
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
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
    },
    vehicleList: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        width: "100%",
    },
    vehicleItem: {
        color: "#ffffff",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        backgroundColor: "#333333",
        borderRadius: 8,
        padding: 20,
        width: "80%",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
    modalText: {
        color: "#ffffff",
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    modalButton: {
        backgroundColor: "#FF4500",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalButtonText: {
        color: "#ffffff",
        fontSize: 16,
    },
    modalInput: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        color: "#ffffff",
        fontSize: 16,
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1,
        marginTop: 5,
    },
    errorText: {
        color: "red",     
        fontSize: 14,   
        alignSelf: "flex-start",
        marginBottom: 7
    }
});