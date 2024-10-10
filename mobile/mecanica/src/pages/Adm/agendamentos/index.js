import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Platform, StatusBar, View, Text } from "react-native"


export default function AgendamentosADM() {
    return (
        <LinearGradient colors={
            ['#000000', 'rgba(0, 0, 0, 0.5)']}
            style={styles.androidSafeArea}>

            <View style={styles.container}>
                <View style={styles.agendamentoItem}>

                    <View style={styles.alinha}>
                        <Text style={styles.textHora}>15:30</Text>
                        <Text style={styles.textData}>20/11/2024</Text>
                    </View>
                    <Text style={styles.textObs}><Text style={{ fontWeight: "bold" }}>Observação</Text>: Realizar troca de oléo</Text>
                    <View style={styles.linhaVermelha}>

                    </View>
                </View>
                <View style={styles.agendamentoItem}>

                    <View style={styles.alinha}>
                        <Text style={styles.textHora}>15:30</Text>
                        <Text style={styles.textData}>20/11/2024</Text>
                    </View>
                    <Text style={styles.textObs}><Text style={{ fontWeight: "bold" }}>Observação</Text>: Realizar troca de oléo</Text>
                    <View style={styles.linhaVermelha}>

                    </View>
                </View>
                <View style={styles.agendamentoItem}>

                    <View style={styles.alinha}>
                        <Text style={styles.textHora}>15:30</Text>
                        <Text style={styles.textData}>20/11/2024</Text>
                    </View>
                    <Text style={styles.textObs}><Text style={{ fontWeight: "bold" }}>Observação</Text>: Realizar troca de oléo</Text>
                    <View style={styles.linhaVermelha}>

                    </View>
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
    agendamentoItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
        paddingTop: 10,
        paddingBottom: 30,
        width: '100%',
        marginTop: 10,
        position: 'relative',
    },
    alinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textHora: {
        fontWeight: "bold",
        fontSize: 20
    },
    textData: {
        color: "#777777",
        fontSize: 20
    },
    textObs: {
        fontSize: 18
    },
    linhaVermelha: {
        position: 'absolute',
        top: 1,
        bottom: 1,
        left: 0, 
        width: 7, 
        backgroundColor: "red",
        borderRadius: 10,
    }
});
