import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api/api";

export default function Historico() {
    const { token, id } = useAuth();
    const [orcamentos, setOrcamentos] = useState([]);
    const [veiculos, setVeiculos] = useState({});

    const getOrcamentos = async () => {
        try {
            const response = await api.get(`/Os/pessoa/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            
            // Transformando dados do array "veiculos" em um objeto para fácil acesso pelo id
            const veiculosMap = response.data.veiculos.reduce((acc, veiculo) => {
                acc[veiculo.id] = veiculo;
                return acc;
            }, {});

            setVeiculos(veiculosMap);
            setOrcamentos(response.data.ordensServico);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrcamentos();
    }, []);

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View style={styles.inputBusca}>
                <TextInput style={styles.input} placeholder="Buscar por placa" />
            </View>
            <View style={styles.container}>
                {orcamentos.length > 0 ? (
                    orcamentos.map((ordem) => {
                        const veiculo = veiculos[ordem.id_veiculo];
                        return (
                            <View style={styles.historicoItem} key={ordem.id}>
                                <Text style={styles.textVeiculo}>
                                    Veículo: {veiculo ? veiculo.placa : "Desconhecido"}
                                </Text>
                                <View style={styles.alinha}>
                                    <Text style={styles.textDados}>
                                        {new Date(ordem.data).toLocaleDateString('pt-BR')}
                                    </Text>
                                    <Text style={styles.textDados}>
                                        R${parseFloat(ordem.total).toFixed(2)}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.icon}>
                                    <MaterialCommunityIcons name="clipboard-text-multiple-outline" size={32} color="white" />
                                </TouchableOpacity>
                            </View>
                        );
                    })
                ) : (
                    <Text>Nenhum orçamento encontrado</Text>
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
