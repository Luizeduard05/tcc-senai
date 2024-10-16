import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, Platform, StyleSheet, StatusBar, Pressable, Image, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import CadastroUser from "../cadastroUser";

export default function Login() {
    const navigation = useNavigation()

    const navegaHome = () => {
        navigation.navigate("Drawer")
    }

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

                    <Text style={styles.text}>Esqueci minha senha</Text>
                    <TouchableOpacity onPress={navegaCadastroUser}>
                    <Text style={styles.text}  >Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnAcessar} onPress={navegaHome}>
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


{/* <View style={styles.container}>

<Text style={styles.title}>Rota Car</Text>

<Text style={styles.text}>Entre na sua conta para acessar as informações</Text>
<Text style={styles.text}>Preencha todos os campos abaixo para realizar login</Text>

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

</View> */}

// container: {
//     flex: 1,
//     backgroundColor: "#90B7CF",
//     alignItems: "center",
//     justifyContent: "center"
//     // justifyContent: "space-evenly",
// },
// title: {
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 25,
//     color: "#cb3256",
// },
// text: {
//     textAlign: "center",
//     color: "#022135",
//     fontSize: 16,
//     fontWeight: 'bold',
//     margin: 10
// },
// inputs: {
//     width: "90%",
//     height: 50,
//     backgroundColor: "#fff",
//     padding: 10,
//     fontSize: 16,
//     borderRadius: 10,
//     margin: 10
// },
// btnAcessar: {
//     width: "90%",
//     height: 50,
//     backgroundColor: "#2188C7",
//     justifyContent: "center",
//     marginBottom: 30,
//     alignItems: "center",
//     borderRadius: 10,
//     marginTop: 10
// },
// textBtn: {
//     fontSize: 20,
//     color: "#022135",
//     fontWeight: "bold",
// },