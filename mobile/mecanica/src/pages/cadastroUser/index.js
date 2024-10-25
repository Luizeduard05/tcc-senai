import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, StatusBar, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import api from "../../services/api/api";
import { useState } from "react";

export default function CadastroUser() {
    const navigation = useNavigation();

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [email, setEmail] = useState();
    const [logradouro, setLogradouro] = useState();
    const [bairro, setBairro] = useState();
    const [estado, setEstado] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState();
    const [cep, setCep] = useState();
    const [telefone, setTelefone] = useState();
    const [senha, setSenha] = useState();

    const navegaLogin = () => {
        navigation.navigate("Login")
    }

    const addNovoUsuario = async () => {
        try {
            const response = await api.post("/usuarios", {
                nome: nome,
                cpf: cpf,
                email: email,
                logradouro: logradouro,
                bairro: bairro,
                estado: estado,
                numero: numero,
                complemento: complemento,
                cep: cep,
                telefone: telefone,
                senha: senha
            })

            console.log(response.data)

            alert("Usuario cadastrado")

            // Limpando campos após cadastro
            setNome('');
            setCpf('');
            setEmail('');
            setLogradouro('');
            setBairro('');
            setEstado('');
            setNumero('');
            setComplemento('');
            setCep('');
            setTelefone('');
            setSenha('');

            navegaLogin()
        } catch (error) {
            console.log(error)
            alert("Erro")
        }
    }

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Seja bem vindo!</Text>
                    <Text style={styles.textStart}>Preencha os campos abaixo para realizar seu cadastro.</Text>

                    <TextInput
                        value={nome}
                        onChangeText={setNome}
                        style={styles.inputs}
                        placeholder="Digite seu nome"
                    />
                    <TextInput
                        value={cpf}
                        onChangeText={setCpf}
                        style={styles.inputs}
                        keyboardType="numeric"
                        placeholder="Digite seu CPF"
                        maxLength={11}
                    />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.inputs}
                        placeholder="Digite seu email"
                    />
                    <TextInput
                        value={logradouro}
                        onChangeText={setLogradouro}
                        style={styles.inputs}
                        placeholder="Digite seu logradouro"
                    />
                    <TextInput
                        value={bairro}
                        onChangeText={setBairro}
                        style={styles.inputs}
                        placeholder="Digite seu bairro"
                    />
                    <TextInput
                        value={estado}
                        onChangeText={setEstado}
                        style={styles.inputs}
                        placeholder="Digite seu estado"
                    />
                    <TextInput
                        value={numero}
                        onChangeText={setNumero}
                        style={styles.inputs}
                        placeholder="Digite o numero da sua residencia"
                    />
                    <TextInput
                        value={complemento}
                        onChangeText={setComplemento}
                        style={styles.inputs}
                        placeholder="Digite um complemento"
                    />
                    <TextInput
                        value={cep}
                        onChangeText={setCep}
                        style={styles.inputs}
                        placeholder="Digite seu cep"
                    />
                    <TextInput
                        value={telefone}
                        onChangeText={setTelefone}
                        style={styles.inputs}
                        placeholder="Digite seu telefone"
                    />

                    <TextInput
                        value={senha}
                        onChangeText={setSenha}
                        style={styles.inputs}
                        maxLength={11}
                        secureTextEntry
                        placeholder="Digite sua Senha"
                    />

                    <View style={styles.alinha}>
                        <Text style={styles.text}>Possuí login?</Text>
                        <TouchableOpacity>
                            <Text style={styles.text} onPress={navegaLogin}>Ir para login</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnCadastrar} onPress={addNovoUsuario}>
                        <Text style={styles.textBtn}>Cadastrar-se</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#383838",
        margin: 30,
        borderRadius: 10,
        elevation: 7,
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        padding: 20,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        color: "#fff",
    },
    textStart: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
        marginBottom: 30
    },
    text: {
        textAlign: "center",
        color: "#FFF",
        margin: 10,
    },
    inputs: {
        width: "90%",
        height: 50,
        backgroundColor: "#fff",
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        margin: 10
    },
    btnCadastrar: {
        width: "70%",
        height: 50,
        backgroundColor: "#FFF",
        justifyContent: "center",
        marginBottom: 30,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20
    },
    textBtn: {
        fontSize: 20,
        color: "#000000",
        fontWeight: "bold",
    },
    alinha: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
