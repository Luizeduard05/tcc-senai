import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, Platform, StyleSheet, StatusBar, Pressable, Image, TouchableOpacity, TextInput } from "react-native"
import { useAuth } from "../../context/AuthContext";

import api from "../../services/api/api";
import { useState } from "react";

export default function Login() {
    const {login, userType} = useAuth();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState("");
    const [token, setToken] = useState("")

    const handleLogin = async () => {
        try {
            const response = await api.post("/login", {
                login: email,
                senha: senha
            }); 
            // console.log(response.data);
    
            if (response.data) {
                setToken(response.data.token);
                const userType = response.data.tipo; // Utilize diretamente o valor da resposta
                // console.log(`tipo : ${userType}`);
                
                // Faz o login e passa o tipo do usuário
                login(userType);
    
                // Realiza a navegação com base no tipo do usuário
                if (userType === "MEC") {
                    navigation.navigate("MechanicStack");
                } else if (userType === "CLI") {
                    navigation.navigate("UserStack");
                } else if (userType === "ADM") {
                    navigation.navigate("AdminStack");
                }
                
            }
        } catch (error) {
            console.log(error);
        }
    };

    const navegaCadastroUser = () => {
        navigation.navigate("CadastroUser")
    }

    return (
        <LinearGradient
            colors={['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea} >

            <View style={styles.container}>
                <Text style={styles.title} >Bem vindo de volta!</Text>
                <Text style={styles.textStart} >Realize login para acessar nosso serviços</Text>


                <TextInput
                    style={styles.inputs}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                ></TextInput>
                <TextInput
                    style={styles.inputs}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    placeholder="Digite sua Senha"
                ></TextInput>

                <View style={styles.alinha}>

                    <Text style={styles.text}>Esqueci minha senha</Text>
                    <TouchableOpacity onPress={navegaCadastroUser}>
                    <Text style={styles.text}  >Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnAcessar} onPress={handleLogin}>
                    <Text style={styles.textBtn}>Acessar</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#383838",
        height: "60%",
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
    btnAcessar: {
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
