import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View , Platform, StatusBar} from "react-native";

export default function GerenciaUser() {
    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <View>
                <Text style={styles.text}>Gerencia Usuario</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    text : {
        color: "white"
    }
})