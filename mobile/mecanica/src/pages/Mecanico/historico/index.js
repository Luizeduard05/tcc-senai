import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, TextInput, ScrollView, Modal } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api/api";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoricoMecanico() {
    const { token } = useAuth();
    const [historico, setHistorico] = useState([]); // Variavel para guardar todos orçamentos
    const [detalhes, setDetalhes] = useState([]); // Variavel para guardar detalhes da "os"
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null); // Variavel para guardar "os" selecionada 
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");

    const getOrcamentos = async () => { // Requisição para trazer todos orçamentos
        try {
            const response = await api.get("/orcamentos", {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            // console.log(response.data);
            setHistorico(response.data.ordensServico);
        } catch (error) {
            console.log("Erro ao buscar histórico:", error);
        }
    };

    const getDetalhesOrcamento = async (id_os) => { // Requisição para trazer detalhes da os
        try {
            const response = await api.get(`/osPecas/${id_os}`, {
                headers: { Authorization: `Token ${token}` }
            });
            const selectedOrcamento = historico.find((orcamento) => orcamento.id_os === id_os);
            setOrcamentoSelecionado(selectedOrcamento); // Guarda a OS selecionada
            setDetalhes(response.data.rows); // Guarda os detalhes da OS
            setModalVisible(true);
        } catch (error) {
            console.log("Erro ao buscar detalhes:", error);
        }
    };

    const filterPorPlaca = () => {
        return historico.filter((placa) =>
            placa.placa.toLowerCase().includes(search.toLowerCase())
        )
    }

    useFocusEffect( // Toda vez que a tela entra em foco executa a função para atualização da lista de orcamentos
        useCallback(() => {
            getOrcamentos()
        }, [])
    )

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View style={styles.inputBusca}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por placa"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <View style={styles.container}>
            <ScrollView>
                    {historico && filterPorPlaca().length > 0 ? (
                        filterPorPlaca().map((historico) => (
                            <View key={historico.id_os} style={styles.historicoItem}>
                                <Text style={styles.textVeiculo}>Veículo: {historico.placa}</Text>
                                <View style={styles.alinha}>
                                    <Text style={styles.textDados}>{historico.data.slice(0, 10)}</Text>
                                    <Text style={styles.textDados}>R${historico.total}</Text>
                                </View>
                                <TouchableOpacity style={styles.icon} onPress={() => getDetalhesOrcamento(historico.id_os)}>
                                    <MaterialCommunityIcons name="clipboard-text-multiple-outline" size={32} color="white" />
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
                            Nenhuma orçamento encontrado
                        </Text>
                    )}
                </ScrollView>

                {modalVisible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Detalhes do Orçamento</Text>
                                {orcamentoSelecionado && (
                                    <>
                                        <Text>Veículo: {orcamentoSelecionado.modelo} ({orcamentoSelecionado.placa})</Text>
                                        <Text>Data: {orcamentoSelecionado.data.slice(0, 10)}</Text>
                                        <Text>Mão de obra: {orcamentoSelecionado.mo}</Text>
                                        <Text>Total: R$ {orcamentoSelecionado.total}</Text>
                                    </>
                                )}
                                <Text style={styles.modalSubtitle}>Produtos:</Text>
                                {detalhes.length > 0 ? (
                                    detalhes.map((produto) => (
                                        <View key={produto.id_itens_os} style={styles.produtoItem}>
                                            <Text>Nome: {produto.nome_produto}</Text>
                                            <Text>Marca: {produto.marca_produto}</Text>
                                            <Text>Valor: R$ {produto.valor_produto}</Text>
                                            <Text>Quantidade: {produto.quantidade}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>Nenhum produto encontrado.</Text>
                                )}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    produtoItem: {
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#000",
        borderRadius: 5,
        padding: 10,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
