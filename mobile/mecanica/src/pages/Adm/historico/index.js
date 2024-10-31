import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../../../services/api/api";

// OBSERVAÇÃO: A ideia é após o usuario clicar na icone da prancheta aparecer as proximas informações de agendamento dados como email do dono do carro, modelo do veiculo, e se for possivel trazer as pecas que foram usadas na mão de obra

export default function HistoricoADM() {
    const { token } = useAuth();
    const [historico, setHistorico] = useState([]);

    const getOrcamentos = async () => {
        try {
            const response = await api.get("/orcamentos", {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            // console.log(response.data);
            setHistorico(response.data.ordensServico);  // Armazena apenas ordensServico
        } catch (error) {
            console.log("Erro ao buscar histórico:", error);
        }
    };

    useEffect(() => {
        getOrcamentos();
    }, []);

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View style={styles.inputBusca}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por placa"
                />
            </View>
            <View style={styles.container}>
                {historico.map((item) => (
                    <View key={item.id_os} style={styles.historicoItem}>
                        <Text style={styles.textVeiculo}>Veículo: {item.placa}</Text>
                        {/* <Text style={styles.textVeiculo}>Modelo: {item.modelo}</Text> */}
                        {/* <Text style={styles.textVeiculo}>Email Cliente: {item.email}</Text> */}
                        <View style={styles.alinha}>
                            <Text style={styles.textDados}>{item.data.slice(0,10)}</Text>
                            <Text style={styles.textDados}>R${item.total}</Text>
                        </View>
                        <TouchableOpacity style={styles.icon}>
                            <MaterialCommunityIcons name="clipboard-text-multiple-outline" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </LinearGradient>
    );
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
    inputBusca: {
        backgroundColor: "#fff",
        width: "90%",
        height: 40,
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        alignSelf: "center",
        shadowColor: "#000",
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
    },
});
