import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, FlatList, Alert, Modal, TextInput, ScrollView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../../../services/api/api";

export default function GerenciaUser() {
    const { token } = useAuth();

    const [users, setUsers] = useState([]) // Variavel responsavel por guardar todos os usuarios
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null) // Variavel responsavel por capturar o usuario selecionado

    const [editModalVisible, setEditModalVisible] = useState(false); // Modal de edição de usuario

    // Variaveis para edição do usuario
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [tipo, setTipo] = useState("")
    const [email, setEmail] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [bairro, setBairro] = useState("")
    const [estado, setEstado] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [cep, setCep] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")

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

    const deleteUser = async () => { // Requisição para deletar um usuario
        try {
            const response = await api.delete(`usuarios/${usuarioSelecionado.pessoa_id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            getUsers()
        } catch (error) {
            console.log(error)
        }
    }

    const editUser = async () => { // Requisição para edição de um usuario
        try {
            await api.put(
                `/usuarios/${usuarioSelecionado.pessoa_id}`,
                {
                    nome: nome,
                    cpf: cpf,
                    tipo: tipo,
                    email: email,
                    logradouro: logradouro,
                    bairro: bairro,
                    estado: estado,
                    numero: numero,
                    complemento: complemento,
                    cep: cep,
                    telefone: telefone,
                    senha: senha
                }
            );
            setEditModalVisible(false)
            getUsers();
        } catch (error) {
            console.log(error)
        }
    }

    const confirmEdit = (usuario) => { // Botão para ativar o modo de edição
        // Atribuindo os valores do usuario selecionado ao modal de edicao
        setUsuarioSelecionado(usuario);
        setNome(usuario.nome);
        setCpf(usuario.cpf);
        setTipo(usuario.tipo);
        setEmail(usuario.email);
        setLogradouro(usuario.logradouro);
        setBairro(usuario.bairro);
        setEstado(); // Falta na resposta API
        setNumero(usuario.numero);
        setComplemento(); // Falta na resposta API
        setCep(); // Falta na resposta API
        setTelefone(usuario.telefone);
        setSenha() // Remover do metodo de ediçao da api
        setEditModalVisible(true)
    }

    const handleDelete = async (user) => { // Botão acionado ao clicar no icone de lixeira
        setUsuarioSelecionado(user); // Armazena o usuário selecionado para excluir
        Alert.alert(
            'Confirmar Exclusão',
            `Tem certeza que deseja excluir o usuário ${user.nome} com o CPF "${user.cpf}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        try {
                            await deleteUser();
                            console.log(`Usuário ${user.nome} excluído`);
                        } catch (error) {
                            console.log("Erro ao excluir o usuário:", error);
                        }
                    },
                },
            ]
        );
    };

    const renderUserItem = ({ item }) => ( // Estrutura individual de cada usuario (Layout)
        <View style={styles.userItem}>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nome}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            {/* <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => confirmEdit(item)}
                >
                    <FontAwesome name="edit" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: 'red' }]}
                    onPress={() => handleDelete(item)}
                >
                    <FontAwesome name="trash" size={18} color="#fff" />
                </TouchableOpacity>
            </View> */}
        </View>
    );

    useEffect(() => { // Função responsavel por carregar o usuarios na inicialização da pagina
        getUsers()
    }, [])

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.pessoa_id}
                renderItem={renderUserItem}
                contentContainerStyle={styles.userList}
            />

            {/* Modal de Edicao */}
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    setEditModalVisible(false)
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            setEditModalVisible(false);
                        }}>
                            <FontAwesome name="close" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Edicao de Usuário</Text>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome"
                                value={nome}
                                onChangeText={setNome}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="CPF"
                                value={cpf}
                                onChangeText={setCpf}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Tipo de usuario"
                                value={tipo}
                                onChangeText={setTipo}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Logradouro"
                                value={logradouro}
                                onChangeText={setLogradouro}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Bairro"
                                value={bairro}
                                onChangeText={setBairro}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Estado"
                                value={estado}
                                onChangeText={setEstado}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Numero"
                                value={numero}
                                onChangeText={setNumero}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Complemento"
                                value={estado}
                                onChangeText={setComplemento}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Cep"
                                value={cep}
                                onChangeText={setCep}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Telefone"
                                value={telefone}
                                onChangeText={setTelefone}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="senha"
                                value={senha}
                                onChangeText={setSenha}
                            />

                            <TouchableOpacity style={styles.button} onPress={editUser}>
                                <Text style={styles.buttonText}>Salvar Alterações</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal> */}
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