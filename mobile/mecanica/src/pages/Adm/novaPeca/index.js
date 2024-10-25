import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity, TextInput } from "react-native"

export default function NovaPeca() {
    return (
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}
        >
            <View style={styles.container}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome da peça:</Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Valor:</Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Quantidade:</Text>
                    <TextInput style={styles.input} />
                </View>

                <TouchableOpacity style={styles.btnConfirmar}>
                    <Text style={styles.textBtn}>Confirmar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCancelar}>
                    <Text style={styles.textBtnCancelar}>Cancelar</Text>
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
        justifyContent: "center",
        margin: 20,
        height: '80%',
        backgroundColor: "#383838",
        borderRadius: 10,
        alignItems: "center",
        elevation: 7,
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    inputGroup: {
        width: '90%',
        marginBottom: 15,
    },
    label: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#fff",
        width: "100%",
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    btnConfirmar: {
        width: "90%",
        height: 50,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    btnCancelar: {
        width: "90%",
        height: 50,
        backgroundColor: "#FF0000",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    textBtnCancelar: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    textBtn: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
    }
})