import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Platform, StatusBar, FlatList } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useCallback, useState } from "react";
import api from "../../../services/api/api";
import { useFocusEffect } from "@react-navigation/native";

export default function GerenciaUser() {
    const { token } = useAuth();
    const [users, setUsers] = useState([]) // Variavel responsavel por guardar todos os usuarios

    const getUsers = async () => { // Requisição para trazer todos os usuarios
        try {
            const response = await api.get("/todosUser", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            // console.log(response.data.result);
            setUsers(response.data.result)
        } catch (error) {
            console.log(error)
        }
    }

    const renderUserItem = ({ item }) => ( // Estrutura individual de cada usuario (Layout)
        <View style={styles.userItem}>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nome}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
        </View>
    );

    useFocusEffect( // Toda vez que a tela entra em foco executa a função para atualização da lista de usuarios
        useCallback(() => {
            getUsers()
        }, [])
    )

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.pessoa_id}
                renderItem={renderUserItem}
                contentContainerStyle={styles.userList}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    userList: {
        padding: 10,
    },
    userItem: {
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        width: '100%',
        maxHeight: '95%',
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 80,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    modalContent: {
        backgroundColor: "#333333",
        borderRadius: 8,
        padding: 20,
        width: "80%",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        color: "#ffffff",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#FF4500",
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    }
})