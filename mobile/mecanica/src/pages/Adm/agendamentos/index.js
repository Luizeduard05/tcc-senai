import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Platform, StatusBar, View, Text } from "react-native"
import { useAuth } from "../../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api/api";
import { useFocusEffect } from "@react-navigation/native";

export default function AgendamentosADM() {
    const { token } = useAuth();
    const [agendamentos, setAgendamentos] = useState([]); // Variavel para guardar todos agendamentos

    const getAgendamentos = async () => {  // Requisição para trazer os agendamentos
        try {
            const response = await api.get("/agendamentos", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            // console.log(response.data.result)
            setAgendamentos(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => { // Trazendo os agendamentos quando o componente é iniciado
    //     getAgendamentos()
    // }, [])

    useFocusEffect(
        useCallback(() => {
            getAgendamentos()
        }, [])
    )

    return (
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}>

            <View style={styles.container}>
                {Array.isArray(agendamentos) && agendamentos.length > 0 ? (
                    agendamentos.map((agendamento) => (
                        <View key={agendamento.id} style={styles.agendamentoItem}>
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
                    <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>Nenhuma Agendamento encontrado</Text>
                )}
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
        fontSize: 20
    },
    textData: {
        color: "#777777",
        fontSize: 20
    },
    textObs: {
        fontSize: 18
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
