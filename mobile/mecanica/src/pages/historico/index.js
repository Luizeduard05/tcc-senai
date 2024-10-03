import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Platform, StatusBar, View, Text, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
export default function Historico() {
    return (
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}>

            <View style={styles.container}>
                <View style={styles.historicoItem}>
                    <Text style={styles.textVeiculo}>Veiculo: UTS-0000</Text>
                    <View style={styles.alinha}>
                        <Text style={styles.textDados}>20/11/2024</Text>
                        <Text style={styles.textDados}>R$343,50</Text>
                    </View>
                    <TouchableOpacity style={styles.icon}>
                        <MaterialCommunityIcons name="clipboard-text-multiple-outline" size={32} color="white" />
                    </TouchableOpacity>
                </View>
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
        flex: 1,
        justifyContent: "flex-start",
        padding: 15,
    },
    historicoItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
        paddingTop: 10,
        paddingBottom: 30,
        width: '100%',
        marginTop: 10,
        position: 'relative',
    },
    textVeiculo: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 10
    },
    textDados: {
        color: "#5B5B5B",
        fontSize: 18
    },
    alinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 80
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
        // borderRadius: 19,
        paddingHorizontal: 10,
    }
})
