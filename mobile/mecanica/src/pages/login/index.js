import { Text, View, Platform, StyleSheet, StatusBar, Pressable, Image, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    return (
        <SafeAreaView style={styles.androidSafeArea}>

            <View style={styles.container}>

                <Text style={styles.titles}>Rota Car</Text>

                <Text style={styles.title}>Entre na sua conta para acessar as informações</Text>
                <Text style={styles.title}>Preencha todos os campos abaixo para realizar login</Text>

                <TextInput
                    keyboardType="numeric"
                    placeholder="Digite seu CPF"
                    maxLength={11}
                    style={styles.inputs}
                ></TextInput>
                <TextInput
                    maxLength={11}
                    secureTextEntry
                    placeholder="Digite sua Senha"
                    style={styles.inputs}
                ></TextInput>

                <TouchableOpacity style={styles.btnAcessar}>
                    <Text style={styles.textBtn}>Acessar</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // backgroundColor: "black"
    },
    container: {
        flex: 1,
        backgroundColor: "#90B7CF",
        alignItems: "center",
        justifyContent: "center"
        // justifyContent: "space-evenly",
    },
    titles: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        color: "#cb3256",
    },
    title: {
        textAlign: "center",
        color: "#022135",
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10
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
        width: "90%",
        height: 50,
        backgroundColor: "#2188C7",
        justifyContent: "center",
        marginBottom: 30,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10
    },
    textBtn: {
        fontSize: 20,
        color: "#022135",
        fontWeight: "bold",
    },
});