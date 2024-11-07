import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, Modal } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import api from "../../../services/api/api";
import { useAuth } from "../../../context/AuthContext";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function VisualizaPeca() {
    const { token } = useAuth();
    const [pecas, setPecas] = useState([]); // Variavel para manipular todas as pecas em estoque
    const [modalVisible, setModalVisible] = useState(false); // Manipulando o Modal
    const [pecaSelecionada, setPecaSelecionada] = useState(null); // Variavel para capturar a peça selecionada

    const getPecas = async () => {  // Requisição para trazer as peças
        try {
            const response = await api.get("/todasPecas", {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setPecas(response.data.pecas);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePeca = async () => { // Requisição para excluir a peça selecionada
        try {
            const response = await api.delete(`/pecas/${pecaSelecionada.id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response.data);
            getPecas();
            setModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(  // Toda vez que a tela entra em foco executa a função para atualização da lista de peças
        useCallback(() => {
            getPecas();
        }, [])
    );

    const handleOpenModal = (peca) => {
        setPecaSelecionada(peca); // Armazena a peça clicada
        setModalVisible(true);
    };

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View style={styles.container}>
                {pecas !== undefined ? (
                    pecas.map((peca) => (
                        <View style={styles.historicoItem} key={Number(peca.id)}>
                            <Text style={styles.textVeiculo}>{peca.nome_produto}</Text>
                            <View style={styles.alinha}>
                                <Text style={styles.textDados}>{peca.marca_produto}</Text>
                                <Text style={styles.textDados}>{peca.valor_produto}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={() => handleOpenModal(peca)} // Passa a peça clicada para o modal
                            >
                                <MaterialCommunityIcons name="clipboard-text-multiple-outline" size={32} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={{ backgroundColor: "#fff" }}>Nenhuma peça em estoque</Text>
                )}


                <Modal visible={modalVisible} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {pecaSelecionada && (
                                <>
                                    <Text style={styles.modalTitle}>{pecaSelecionada.nome_produto}</Text>
                                    <Text style={styles.modalText}>Marca: {pecaSelecionada.marca_produto}</Text>
                                    <Text style={styles.modalText}>Valor: R$ {pecaSelecionada.valor_produto}</Text>

                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity style={styles.iconButton} onPress={deletePeca}>
                                            <MaterialCommunityIcons name="delete" size={24} color="red" />
                                            <Text style={styles.iconText}>Excluir</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.iconButton} onPress={() => {/* função para editar */ }}>
                                            <MaterialCommunityIcons name="pencil" size={24} color="blue" />
                                            <Text style={styles.iconText}>Editar</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                                        <Text style={styles.modalCloseText}>Fechar</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
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
        paddingBottom: 10,
    },
    textDados: {
        color: "#5B5B5B",
        fontSize: 18,
    },
    alinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 80,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    iconButton: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        color: '#666',
    },
    modalCloseButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FF4444',
        borderRadius: 8,
    },
    modalCloseText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
