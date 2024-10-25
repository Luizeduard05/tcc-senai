import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import api from "../../../services/api/api"
import { useAuth } from "../../../context/AuthContext"
import { useNavigation } from "@react-navigation/native"

export default function NovaPeca() {
    const navigation = useNavigation()
    const {token} = useAuth()

    const [nome, setNome] = useState("")
    const [marca, setMarca] = useState("")
    const [valor, setValor] = useState("");

    const navegaVisualizaPecas = () => {
    navigation.navigate("VisualizaPecaADM")
    }

    const postPeca = async () => {
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
            console.log(response.data);
            navegaVisualizaPecas()
        } catch (error) {
            console.log("Erro ao cadastrar a peça:", error);
        }
    };


    return (
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}
        >
            <View style={styles.container}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome da peça:</Text>
                    <TextInput style={styles.input} value={nome} onChangeText={setNome} />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Marca:</Text>
                    <TextInput style={styles.input} value={marca} onChangeText={setMarca} />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Valor:</Text>
                    <TextInput style={styles.input} value={valor} onChangeText={setValor} />
                </View>

                <TouchableOpacity style={styles.btnConfirmar}  onPress={postPeca}>
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
        justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    }
})