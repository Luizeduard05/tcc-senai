import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function CardServico() {
    return (
        <View style={styles.containerServicos}>
            <Text style={styles.title}>Principais serviços</Text>

            <View style={styles.alinhar}>
                <View style={styles.info}>
                <View  style={styles.borda}>
                <MaterialCommunityIcons  name='information-outline' size={40} color="#fff" />
                </View>
                <Text style={styles.textInfo}>Freio</Text>
                </View>

                <View style={styles.info}>
                <View  style={styles.borda}>
                <MaterialCommunityIcons name='engine' size={40} color="#fff" />
                </View>
                <Text style={styles.textInfo}>Motor</Text>
                </View>

                <View style={styles.info}>
                <View  style={styles.borda}>
                <MaterialCommunityIcons name='car-settings' size={40} color="#fff" />
                </View>
                <Text style={styles.textInfo}>Suspensão</Text>
                </View>

                <View style={styles.info}>
                <View  style={styles.borda}>
                <MaterialCommunityIcons name='oil' size={40} color="#fff" />
                </View>
                <Text style={styles.textInfo}>Troca de oléo</Text>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    containerServicos: {
        backgroundColor: "#ff0000",
        width: "95%",
        height: 230,
        marginTop: 15,
        borderRadius: 15,
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontWeight: "condensed",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 40,
        color: "#fff"
    },
    alinhar: {
        flexDirection: "row",
        gap: 15,
    
    },
    info: {
        alignItems: "center"
    },
    borda: {
        borderWidth: 1,                
        borderColor: "white",          
        borderRadius: 20,              
        padding: 10,                   
        justifyContent: 'center',      
        alignItems: 'center',          
    },
    textInfo: {
        color: "#fff"
    }

})