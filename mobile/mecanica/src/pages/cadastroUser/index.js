import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, StatusBar, Platform, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import api from "../../services/api/api";
import { useState } from "react";

export default function CadastroUser() {
    const navigation = useNavigation();
    const [step, setStep] = useState(1);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');

    const navegaLogin = () => navigation.navigate("Login");

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
            });
            alert("Usuário cadastrado com sucesso");
            navegaLogin();
        } catch (error) {
            console.log(error);
            alert("Erro no cadastro");
        }
    };

    const nextStep = () => setStep(step + 1);
    const previousStep = () => setStep(step - 1);

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Seja bem-vindo!</Text>
                <Text style={styles.textStart}>Preencha os campos abaixo para realizar seu cadastro.</Text>
                <Text style={styles.stepText}>Passo {step} de 3</Text>

                {step === 1 && (
                    <>
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

                        <View style={styles.alinha}>
                            <Text style={styles.text}>Possui login?</Text>
                            <TouchableOpacity onPress={navegaLogin}>
                                <Text style={styles.text}>Ir para login</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.navigationButtons}>
                            <TouchableOpacity style={styles.btnNext} onPress={nextStep}>
                                <FontAwesome name="arrow-right" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {step === 2 && (
                    <>
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
                            placeholder="Número da residência"
                        />
                        <TextInput
                            value={complemento}
                            onChangeText={setComplemento}
                            style={styles.inputs}
                            placeholder="Complemento"
                        />

                        <View style={styles.navigationButtons}>
                            <TouchableOpacity style={styles.btnBack} onPress={previousStep}>
                                <FontAwesome name="arrow-left" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnNext} onPress={nextStep}>
                                <FontAwesome name="arrow-right" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {step === 3 && (
                    <>
                        <TextInput
                            value={cep}
                            onChangeText={setCep}
                            style={styles.inputs}
                            placeholder="Digite seu CEP"
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
                            secureTextEntry
                            placeholder="Digite sua Senha"
                        />
                        <TouchableOpacity style={styles.btnCadastrar} onPress={addNovoUsuario}>
                            <Text style={styles.textBtn}>Cadastrar-se</Text>
                        </TouchableOpacity>
                        <View style={styles.navigationButtons}>
                            <TouchableOpacity style={styles.btnBack} onPress={previousStep}>
                                <FontAwesome name="arrow-left" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 0,
        width: "80%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#383838",
        margin: 30,
        elevation: 7,
        borderRadius: 10,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        padding: 20,
    },
    title: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 10,
    },
    textStart: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
        marginBottom: 30
    },
    stepText: {
        color: "#FFF",
        fontSize: 16,
        marginBottom: 20,
    },
    inputs: {
        width: "90%",
        height: 50,
        backgroundColor: "#fff",
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        margin: 10,
    },
    btnNext: {
        width: 50,
        height: 50,
        backgroundColor: "#007BFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    btnCadastrar: {
        width: "70%",
        height: 50,
        backgroundColor: "#28A745",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    textBtn: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    btnBack: {
        width: 50,
        height: 50,
        backgroundColor: "#6C757D",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    alinha: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        textAlign: "center",
        color: "#FFF",
        margin: 10,
    },
    navigationButtons: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around", 
        marginTop: 20,
    }
});
