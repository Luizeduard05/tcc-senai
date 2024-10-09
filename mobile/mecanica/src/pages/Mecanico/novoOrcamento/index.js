import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TextInput, TouchableOpacity } from "react-native";


export default function NovoOrcamentoMecanico() {
    return (
        <LinearGradient
            colors={['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}
        >
            <View style={styles.container}>

                <Text>Data</Text>
                <TextInput>
                </TextInput>

                <Text>Placa</Text>
                <TextInput>
                </TextInput>

                <Text>Observação</Text>
                <TextInput>
                </TextInput>

                <Text>Orçamento</Text>
                <TextInput>
                </TextInput>

                <TouchableOpacity style={styles.btnConfirmar} >
                    <Text style={styles.textBtn}>Confirmar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCancelar} >
                    <Text style={styles.textBtnCancelar}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 0,
        margin: 20,
        height: '80%',
        backgroundColor: "#383838",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnConfirmar: {
        width: "70%",
        height: 50,
        backgroundColor: "#FFF",
        justifyContent: "center",
        // marginBottom: 30,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20
    },
    btnCancelar: {
        width: "70%",
        height: 50,
        backgroundColor: "#FF0000",
        justifyContent: "center",

        alignItems: "center",
        borderRadius: 10,
        marginTop: 20
    },
    textBtnCancelar: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    textBtn: {
        fontSize: 20,
        color: "#000000",
        fontWeight: "bold",
    }
})
