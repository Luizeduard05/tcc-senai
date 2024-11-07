import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Text, StyleSheet, StatusBar, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import api from "../../../services/api/api";
import { useAuth } from "../../../context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

export default function CadastroAdmMec() {
    const { token } = useAuth()

    const [step, setStep] = useState(1); // Variavel para armazenar etapas do formulario

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

    const [tiposUsuario, setTiposUsuario] = useState([{ id: 1, tipo: "MEC" }, { id: 2, tipo: "ADM" }, { id: 3, tipo: "CLI" }]);// Variavel para guardar os tipos de usuarios existentes na aplicação
    const [tipoSelecionado, setTipoSelecionado] = useState(null); // Variavel para guarda o tipo de usuario que foi selecionado

    const addNovoFunc = async () => {
        try {
            const response = await api.post("/adm/usuarios", {
                nome: nome,
                cpf: cpf,
                email: email,
                tipo: tipoSelecionado,
                logradouro: logradouro,
                bairro: bairro,
                estado: estado,
                numero: numero,
                complemento: complemento,
                cep: cep,
                telefone: telefone,
                senha: senha
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data)
            alert("Usuario cadastrado")

            setNome('');
            setCpf('');
            setEmail('');
            setTipoSelecionado(null)
            setLogradouro('');
            setBairro('');
            setEstado('');
            setNumero('');
            setComplemento('');
            setCep('');
            setTelefone('');
            setSenha('');

        } catch (error) {
            console.log(error)
            alert("Erro")
        }
    }

    const nextStep = () => {
        setStep(step + 1)
    }
    const previousStep = () => setStep(step - 1);

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.textStart}>Preencha os campos abaixo para realizar o cadastro de um novo funcionario.</Text>
                    <Text style={styles.stepText}>Passo {step} de 3</Text>

                    {step === 1 && (
                        <>
                            <Picker
                                selectedValue={tipoSelecionado}
                                onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
                                style={styles.inputs}
                            >
                                {tiposUsuario.map((tipo) => (
                                    <Picker.Item
                                        key={tipo.id}
                                        label={`Tipo: ${tipo.tipo}`}
                                        value={tipo.tipo}
                                    />
                                ))}
                            </Picker>

                            <TextInput
                                value={nome}
                                onChangeText={setNome}
                                style={styles.inputs}
                                placeholder="Nome do funcionario"
                            />

                            <TextInput
                                value={cpf}
                                onChangeText={setCpf}
                                style={styles.inputs}
                                keyboardType="numeric"
                                placeholder="CPF do funcionario"
                                maxLength={11}
                            />

                            <TextInput
                                value={telefone}
                                onChangeText={setTelefone}
                                style={styles.inputs}
                                placeholder="Telefone do funcionario"
                            />

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
                                value={cep}
                                onChangeText={setCep}
                                style={styles.inputs}
                                placeholder="Cep do funcionario"
                            />
                            <TextInput
                                value={bairro}
                                onChangeText={setBairro}
                                style={styles.inputs}
                                placeholder="Bairro do funcionario"
                            />
                            <TextInput
                                value={numero}
                                onChangeText={setNumero}
                                style={styles.inputs}
                                placeholder="Numero da sua residencia do funcionario"
                            />
                            <TextInput
                                value={estado}
                                onChangeText={setEstado}
                                style={styles.inputs}
                                placeholder="Estado do funcionario"
                            />
                            <TextInput
                                value={logradouro}
                                onChangeText={setLogradouro}
                                style={styles.inputs}
                                placeholder="Logradouro do funcionario"
                            />
                            <TextInput
                                value={complemento}
                                onChangeText={setComplemento}
                                style={styles.inputs}
                                placeholder="Complemento do funcionario"
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
                                value={email}
                                onChangeText={setEmail}
                                style={styles.inputs}
                                placeholder="Email do funcionario"
                            />

                            <TextInput
                                value={senha}
                                onChangeText={setSenha}
                                style={styles.inputs}
                                maxLength={11}
                                secureTextEntry
                                placeholder="Senha do funcionario"
                            />

                            <View style={styles.navigationButtons}>
                                <TouchableOpacity style={styles.btnBack} onPress={previousStep}>
                                    <FontAwesome name="arrow-left" size={20} color="#FFFFFF" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnCadastrar} onPress={addNovoFunc}>
                                    <Text style={styles.textBtn}>Cadastrar</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    )
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
    textStart: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
        marginBottom: 30
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
        backgroundColor: "#28A745",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    textBtn: {
        fontSize: 20,
        color: "#000000",
        fontWeight: "bold",
    },
    stepText: {
        color: "#FFF",
        fontSize: 16,
        marginBottom: 20,
    },
    navigationButtons: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around",
        marginTop: 20,
    },
    btnNext: {
        width: 50,
        height: 50,
        backgroundColor: "#007BFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    btnBack: {
        width: 50,
        height: 50,
        backgroundColor: "#6C757D",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    }
});
