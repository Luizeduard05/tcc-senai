import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Text, StyleSheet, StatusBar, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import api from "../../../services/api/api";
import { useAuth } from "../../../context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { validaCEP, validaComplemento, validaCPF, validaNome, validaNumeroResidencia, validaTelefone, validaEmail, validaSenha } from "../../../utils/inputValidation";

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

    const [nomeError, setNomeError] = useState(null)// Variavel responsavel por retornar o erro de validação dos inputs
    const [cpfError, setCpfError] = useState(null)// Variavel responsavel por retornar o erro de validação dos inputs
    const [telefoneError, setTelefoneError] = useState(null)// Variavel responsavel por retornar o erro de validação dos inputs

    const [cepError, setCepError] = useState(null)// Variavel responsavel por retornar o erro de validação dos inputs
    const [numeroError, setNumeroError] = useState(null)// Variavel responsavel por retornar o erro de validação dos inputs
    const [complementoError, setComplementoError] = useState(null)// Variavel responsavel por retornar o erro de validação dos inputs

    const [emailError, setEmailError] = useState(null); // Variavel responsavel por retornar o erro de validação dos inputs
    const [senhaError, setSenhaError] = useState(null); // Variavel responsavel por retornar o erro de validação dos inputs

    const addNovoFunc = async () => {
        // Validando email e senha
        const emailValidationError = validaEmail(email);
        const senhaValidationError = validaSenha(senha);

        // Atualizando os estados com as mensagens de erro da validação
        setEmailError(emailValidationError);
        setSenhaError(senhaValidationError);

        if (emailValidationError || senhaValidationError) { // Caso ocorra erro de validação interompe o login
            return;
        }
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

    const buscarCep = async () => { // Função para busca de CEP
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await response.json()
            // console.log(data)

            if (!data.erro) { // Se a resposta for diferente de erro atrela os valores ao input
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
                setEstado(data.uf);
            } else {
                alert("CEP não encontrado");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const nextStep = () => {
        switch (step) {
            case 1:
                // Validando campos
                const nomeValidationError = validaNome(nome);
                const cpfValidationError = validaCPF(cpf);
                const telefoneValidationError = validaTelefone(telefone);

                // Atualização de mensagens de erro da validação
                setNomeError(nomeValidationError)
                setCpfError(cpfValidationError)
                setTelefoneError(telefoneValidationError)
                if (nomeValidationError || cpfValidationError || telefoneValidationError) { // Validando todos os campos
                    return
                }
                setStep(step + 1)
                break;
            case 2:
                // Validando campos
                const cepValidationError = validaCEP(cep);
                const numeroValidationError = validaNumeroResidencia(numero);
                const complementoValidationError = validaComplemento(complemento);

                // Atualização de mensagens de erro da validação
                setCepError(cepValidationError);
                setNumeroError(numeroValidationError);
                setComplementoError(complementoValidationError);

                if (cepValidationError || numeroValidationError || complementoValidationError) { // Validando todos os campos
                    return
                }
                setStep(step + 1)
                break;
        }
    }
    const previousStep = () => setStep(step - 1);

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.textStart}>Preencha os campos abaixo para realizar o cadastro de um novo usuario.</Text>
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
                                onChangeText={(text) => {
                                    setNome(text);
                                    setNomeError(null); // Limpando o erro para proxima tentativa
                                }}
                                style={[styles.inputs, nomeError ? styles.inputError : null]}
                                placeholder="Nome do usuario"
                            />
                            {nomeError && <Text style={styles.errorText}>{nomeError}</Text>}

                            <TextInput
                                value={cpf}
                                onChangeText={(text) => {
                                    setCpf(text);
                                    setCpfError(null); // Limpando o erro para proxima tentativa
                                }}
                                style={[styles.inputs, cpfError ? styles.inputError : null]}
                                keyboardType="numeric"
                                placeholder="CPF do usuario"
                                maxLength={11}
                            />
                            {cpfError && <Text style={styles.errorText}>{cpfError}</Text>}

                            <TextInput
                                value={telefone}
                                onChangeText={(text) => {
                                    setTelefone(text);
                                    setTelefoneError(null); // Limpando o erro para proxima tentativa
                                }}
                                style={[styles.inputs, telefoneError ? styles.inputError : null]}
                                placeholder="Telefone do usuario"
                                maxLength={11}
                            />
                            {telefoneError && <Text style={styles.errorText}>{telefoneError}</Text>}

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
                                onChangeText={(text) => {
                                    setCep(text);
                                    setCepError(null); // Limpando o erro para proxima tentativa
                                }}
                                style={[styles.inputs, cepError ? styles.inputError : null]}
                                onBlur={buscarCep}
                                maxLength={8}
                                placeholder="CEP do usuario"
                            />
                            {cepError && <Text style={styles.errorText}>{cepError}</Text>}

                            <TextInput
                                value={bairro}
                                onChangeText={setBairro}
                                editable={false}
                                style={styles.inputs}
                                placeholder="Bairro do usuario"
                            />
                            <TextInput
                                value={numero}
                                onChangeText={(text) => {
                                    setNumero(text);
                                    setNumeroError(null); // Limpando o erro para proxima tentativa
                                }}
                                maxLength={6}
                                style={[styles.inputs, numeroError ? styles.inputError : null]}
                                placeholder="Numero da residencia do usuario"
                            />
                            {numeroError && <Text style={styles.errorText}>{numeroError}</Text>}
                            <TextInput
                                value={estado}
                                onChangeText={setEstado}
                                style={styles.inputs}
                                editable={false}
                                placeholder="Estado do usuario"
                            />
                            <TextInput
                                value={logradouro}
                                onChangeText={setLogradouro}
                                style={styles.inputs}
                                editable={false}
                                placeholder="Logradouro do usuario"
                            />
                            <TextInput
                                value={complemento}
                                onChangeText={(text) => {
                                    setComplemento(text);
                                    setComplementoError(null); // Limpando o erro para proxima tentativa
                                }}
                                style={[styles.inputs, complementoError ? styles.inputError : null]}
                                placeholder="Complemento do usuario"
                            />
                            {complementoError && <Text style={styles.errorText}>{complementoError}</Text>}

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
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError(null); // Limpando o erro para proxima tentativa
                                }}
                                style={[styles.inputs, emailError ? styles.inputError : null]}
                                placeholder="Email do usuario"
                            />
                            {emailError && <Text style={styles.errorText}>{emailError}</Text>}

                            <TextInput
                                value={senha}
                                onChangeText={(text) => {
                                    setSenha(text);
                                    setSenhaError(null); // // Limpando o erro para proxima tentativa
                                }}
                                style={[styles.inputs, senhaError ? styles.inputError : null]}
                                maxLength={11}
                                secureTextEntry
                                placeholder="Senha do usuario"
                            />
                            {senhaError && <Text style={styles.errorText}>{senhaError}</Text>}

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
        flex: 0,
        width: "80%",
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
    inputError: {
        borderColor: "red",
        borderWidth: 1,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        alignSelf: "flex-start",
        marginLeft: 20,
    },
    btnCadastrar: {
        width: "70%",
        height: 50,
        backgroundColor: "#28A745",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
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
