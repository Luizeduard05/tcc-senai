import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Platform, StatusBar, View, Text, ScrollView } from "react-native"
import { useAuth } from "../../../context/AuthContext";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../services/api/api";

export default function AgendamentosADM() {
    const { token } = useAuth();
    const [agendamentos, setAgendamentos] = useState([]); // Variavel para guardar todos agendamentos

    const getAgendamentos = async () => { // Requisicao para trazer todos os agendamentos 
        try {
            const response = await api.get("/agendamentos", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            const agendamentosData = response.data.result;
            const agendamentosComProprietarios = await Promise.all( // Fazendo um map para associar os agendamentos aos propreitarios
                agendamentosData.map(async (agendamento) => {
                    const proprietario = await getDetalhesAgendamento(agendamento.id_pessoa_veiculo_os);
                    return { ...agendamento, proprietario };
                })
            );
            setAgendamentos(agendamentosComProprietarios);
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }
    };

    const getDetalhesAgendamento = async (id_pessoa_veiculo_os) => {
        try {
            const response = await api.get(`/usuario/${id_pessoa_veiculo_os}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            const detalhes = response.data.result;
            return Array.isArray(detalhes) && detalhes.length > 0 ? detalhes[0] : null;
        } catch (error) {
            console.error(`Erro ao buscar detalhes do agendamento ${id_pessoa_veiculo_os}:`, error);
            return null; // Retorna null se a requisição falhar
        }
    };

    useFocusEffect( // Sempre que a pagina é focada chama a requisição de agendamentos
        useCallback(() => {
            getAgendamentos()
        }, [])
    )

    return (
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}>

            <View style={styles.container}>
                <ScrollView>
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
                                <Text style={styles.textData}>Proprietario: {agendamento.proprietario?.nome || "Desconhecido"}</Text>
                                <View style={styles.linhaVermelha} />
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>Nenhuma Agendamento encontrado</Text>
                    )}
                </ScrollView>
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
