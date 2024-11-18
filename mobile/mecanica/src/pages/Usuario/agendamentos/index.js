import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../../../services/api/api";

export default function Agendamentos() {
    const { token, id } = useAuth();
    const [agendamentos, setAgendamentos] = useState([]);

    const getAgendamentos = async () => {
        try {
            const response = await api.get(`/agendar/pessoa/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setAgendamentos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAgendamentos();
    }, []);

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View style={styles.container}>
                {Array.isArray(agendamentos) && agendamentos.length > 0 ? (
                    agendamentos.map((agendamento, index) => (
                        <View key={index} style={styles.agendamentoItem}>
                            <View style={styles.alinha}>
                                <Text style={styles.textHora}>{agendamento.Data_e_hora.slice(12, 17)}</Text>
                                <Text style={styles.textData}>{agendamento.Data_e_hora.slice(0, 10)}</Text>
                            </View>
                            <Text style={styles.textObs}>
                                <Text style={{ fontWeight: "bold" }}>Observação:</Text> {agendamento.Observação}
                            </Text>
                            <View style={styles.linhaVermelha} />
                        </View>
                    ))
                ) : (
                    <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>Nenhum agendamento encontrado.</Text>
                )}
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
    agendamentoItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
        paddingTop: 10,
        paddingBottom: 30,
        width: '100%',
        marginTop: 10,
        position: 'relative',
    },
    alinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textHora: {
        fontWeight: "bold",
        fontSize: 20,
    },
    textData: {
        color: "#777777",
        fontSize: 20,
    },
    textObs: {
        fontSize: 18,
    },
    linhaVermelha: {
        position: 'absolute',
        top: 1,
        bottom: 1,
        left: 0,
        width: 7,
        backgroundColor: "red",
        borderRadius: 10,
    }
});
