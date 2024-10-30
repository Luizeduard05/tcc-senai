import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, TextInput } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import api from "../../../services/api/api"
import { useAuth } from "../../../context/AuthContext"
import { useEffect, useState } from "react"

export default function VisualizaPeca() {
    const { token } = useAuth()
    const [pecas, setPecas] = useState([])

    const getPecas = async () => {
        try {
            const response = await api.get("/pecas", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setPecas(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPecas()
    }, [])

    return (
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}>
            <View style={styles.container}>

                {pecas.length > 0 ? (pecas.map((peca) => (
                    <View style={styles.historicoItem} key={peca.id}>
                        <Text style={styles.textVeiculo}>{peca.nome_produto}</Text>
                        <View style={styles.alinha}>
                            <Text style={styles.textDados}>{peca.marca_produto}</Text>
                            <Text style={styles.textDados}>{peca.valor_produto}</Text>
                        </View>
                        <TouchableOpacity style={styles.icon}>
                            <MaterialCommunityIcons name="clipboard-text-multiple-outline" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                ))
                ) : (<Text>Nenhuma em estoque</Text>)}

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
        flex: 1,
        justifyContent: "flex-start",
        padding: 15,
    },
    historicoItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
        paddingTop: 10,
        paddingBottom: 30,
        width: '100%',
        marginTop: 10,
        position: 'relative',
        elevation: 5,
    },
    textVeiculo: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 10
    },
    textDados: {
        color: "#5B5B5B",
        fontSize: 18
    },
    alinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 80
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});
