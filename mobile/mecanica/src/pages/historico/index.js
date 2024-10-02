import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet,Platform, StatusBar } from "react-native"

export default function Historico() {
    return(
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}>
           
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})