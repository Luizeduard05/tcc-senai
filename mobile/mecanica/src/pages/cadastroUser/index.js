import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, StatusBar, Platform, TextInput, TouchableOpacity } from "react-native";

export default function CadastroUser() {
    const navigation = useNavigation();

    const navegaLogin = () => {
        navigation.navigate("Login")
    }

    return (
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}>
            <View style={styles.container}>
                <Text style={styles.title} > Seja bem vindo!</Text>
                <Text style={styles.textStart} >Preencha os campos abaixo para realizar seu cadastro.</Text>

                <TextInput
                    style={styles.inputs}
                    placeholder="Digite seu nome"
                ></TextInput>
                <TextInput
                    style={styles.inputs}
                    placeholder="Digite seu telefone"
                ></TextInput>
                <TextInput
                    style={styles.inputs}
                    placeholder="Digite seu email"
                ></TextInput>
                <TextInput
                    style={styles.inputs}
                    keyboardType="numeric"
                    placeholder="Digite seu CPF"
                    maxLength={11}
                ></TextInput>

                <TextInput
                    style={styles.inputs}
                    maxLength={11}
                    secureTextEntry
                    placeholder="Digite sua Senha"
                ></TextInput>

                <View style={styles.alinha}>

                    <Text style={styles.text}>Possuí login?</Text>
                    <TouchableOpacity >
                        <Text style={styles.text} onPress={navegaLogin}>Ir para login</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnCadastrar} onPress={navegaLogin}  >
                    <Text style={styles.textBtn} >Cadastrar-se</Text>
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
        height: "80%",
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