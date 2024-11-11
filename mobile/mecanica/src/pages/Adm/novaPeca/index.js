import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import api from "../../../services/api/api"
import { useAuth } from "../../../context/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { validaMarca, validaNome, validaValor } from "../../../utils/inputValidation"

export default function NovaPeca() {
    const navigation = useNavigation();
    const { token } = useAuth();

    //Campos do form
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [valor, setValor] = useState("");

    // Variaveis responsavel por retornar o erro de validação dos inputs
    const [nomeError, setNomeError] = useState(null);
    const [marcaError, setMarcaError] = useState(null);
    const [valorError, setValorError] = useState(null);

    const navegaVisualizaPecas = () => { // Função para navegação de pagina
        navigation.navigate("VisualizaPecaADM");
    }

    const navegaHome = () => {
        navigation.navigate("Home");
    }

    const limparCamposForm = () => {
        setNome("")
        setMarca("")
        setValor("")
    }

    const postPeca = async () => { // Requisição para cadastro de peça no estoque
        // Validando campos
        const nomeValidationError = validaNome(nome);
        const marcaValidationError = validaMarca(marca);
        const valorValidationError = validaValor(valor);

        // Atualizando os estados com as mensagens de erro da validação
        setNomeError(nomeValidationError);
        setMarcaError(marcaValidationError);
        setValorError(valorValidationError);

        if (nomeValidationError || marcaValidationError || valorValidationError) { // Caso ocorra erro de validação interompe o login
            return;
        }
        try {
            const response = await api.post(
                "/pecas",
                {
                    nome_produto: nome,
                    marca_produto: marca,
                    valor_produto: valor,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            Alert.alert(`Peça ${nome} cadastrada`);
            // console.log(response.data);
            limparCamposForm();
            navegaVisualizaPecas();
        } catch (error) {
            console.log("Erro ao cadastrar a peça:", error);
        }
    };


    return (
        <LinearGradient
            colors={['#000000', 'rgba(0, 0, 0, 0.7)']}
            style={styles.androidSafeArea}
        >
            <View style={styles.container}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome da peça:</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setNome(text);
                            setNomeError(null);
                        }}
                        style={[styles.inputs, nomeError ? styles.inputError : null]}
                        value={nome}
                        placeholder="Ex: Bomba de água"
                    />
                    {nomeError && <Text style={styles.errorText}>{nomeError}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Marca:</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setMarca(text);
                            setMarcaError(null);
                        }}
                        style={[styles.inputs, marcaError ? styles.inputError : null]}
                        value={marca}
                        placeholder="Ex: Indisa"
                    />
                    {marcaError && <Text style={styles.errorText}>{marcaError}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Valor:</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setValor(text);
                            setValorError(null);
                        }}
                        style={[styles.inputs, valorError ? styles.inputError : null]}
                        value={valor}
                        keyboardType="numeric"
                        placeholder="Ex: 121.40"
                    />
                    {valorError && <Text style={styles.errorText}>{valorError}</Text>}
                </View>

                <TouchableOpacity style={styles.btnConfirmar} onPress={postPeca}>
                    <Text style={styles.textBtn}>Confirmar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCancelar} onPress={() => { navegaHome(); limparCamposForm(); }}>
                    <Text style={styles.textBtnCancelar}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        justifyContent: "center",
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: "#2d2d2d",
        borderRadius: 12,
        alignItems: "center",
        elevation: 8,
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 8,
    },
    inputs: {
        width: "100%",
        height: 50,
        backgroundColor: "#ffffff",
        paddingHorizontal: 15,
        fontSize: 16,
        borderRadius: 8,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#cccccc",
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1.5,
    },
    errorText: {
        color: "red",
        fontSize: 13,
        marginTop: 5,
        alignSelf: "flex-start",
    },
    btnConfirmar: {
        width: "100%",
        height: 50,
        backgroundColor: "#1DB954",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 20,
        elevation: 4,
        shadowColor: "#000",
    },
    btnCancelar: {
        width: "100%",
        height: 50,
        backgroundColor: "#d9534f",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 15,
        elevation: 4,
        shadowColor: "#000",
    },
    textBtn: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "600",
    },
    textBtnCancelar: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "600",
    }
});