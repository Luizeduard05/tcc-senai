import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, TextInput, Modal, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api/api";

export default function Historico() {
    const { token, id } = useAuth();
    const [orcamentos, setOrcamentos] = useState([]); // Variavel para guardar todas "os" do cliente
    const [veiculos, setVeiculos] = useState({}); // Variavel para guardar os carros do cliente
    const [detalhes, setDetalhes] = useState([]); // Variavel para guardar detalhes da "os"
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null); // Variavel para guardar "os" selecionada 
    const [modalVisible, setModalVisible] = useState(false);

    const getOrcamentos = async () => { // Requisição para trazer as "os"
        try {
            const response = await api.get(`/os/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            // console.log(response.data.ordensServico)
            setOrcamentos(response.data.ordensServico);
        } catch (error) {
            console.log(error);
        }
    };

    const getVeiculos = async () => { // Requisição para trazer os veiculos do cliente
        try {
            const response = await api.get(`/veiculos/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            // console.log(response.data.person)
            setVeiculos(
                response.data.person.reduce((acc, veiculo) => {
                    acc[veiculo.id] = veiculo;
                    return acc;
                }, {})
            );
        } catch (error) {
            console.log(error)
        }
    }

    const getDetalhesOrcamento = async (orcamento) => { // Requisição para trazer os detalhes da "os"
        try {
            const response = await api.get(`/osPecas/${orcamento.id}`, {
                headers: { Authorization: `Token ${token}` }
            });
            setOrcamentoSelecionado(orcamento);
            setDetalhes(response.data.rows);
            setModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrcamentos();
        getVeiculos();
    }, []);

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View style={styles.inputBusca}>
                <TextInput style={styles.input} placeholder="Buscar por placa" placeholderTextColor="#777" />
            </View>
            <View style={styles.container}>
                {Array.isArray(orcamentos) && orcamentos.length > 0 ? (
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
                                <TouchableOpacity style={styles.icon} onPress={() => getDetalhesOrcamento(ordem)}>
                                    <MaterialCommunityIcons name="clipboard-text-multiple-outline" size={32} color="white" />
                                </TouchableOpacity>
                            </View>
                        );
                    })
                ) : (
                    <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>Nenhum orçamento encontrado</Text>
                )}
            </View>

            {/* Modal de Detalhes */}
            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {orcamentoSelecionado && (
                            <>
                                <Text style={styles.modalTitle}>Detalhes do Orçamento</Text>
                                <Text style={styles.modalText}>Data: {new Date(orcamentoSelecionado.data).toLocaleDateString('pt-BR')}</Text>
                                <Text style={styles.modalText}>Veículo: {veiculos[orcamentoSelecionado.id_veiculo]?.placa || 'Desconhecido'}</Text>

                                {/* Lista de produtos */}
                                {detalhes && detalhes.length > 0 ? (
                                    detalhes.map((item, index) => (
                                        <View key={index} style={styles.itemDetail}>
                                            <Text style={styles.modalText}>Produto: {item.nome_produto}</Text>
                                            <Text style={styles.modalText}>Marca: {item.marca_produto}</Text>
                                            <Text style={styles.modalText}>Valor: R${parseFloat(item.valor_produto).toFixed(2)}</Text>
                                            <Text style={styles.modalText}>Quantidade: {item.quantidade}</Text>
                                        </View>
                                    ))

                                ) : (
                                    <Text style={styles.modalText}>Carregando produtos...</Text>
                                )}
                                <Text style={styles.modalText}>Mão de obra: R${parseFloat(orcamentoSelecionado.mo).toFixed(2)}</Text>
                                <Text style={styles.modalText}>Total: R${parseFloat(orcamentoSelecionado.total).toFixed(2)}</Text>
                            </>
                        )}
                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 5,
    },
    itemDetail: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 5,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    }
});
