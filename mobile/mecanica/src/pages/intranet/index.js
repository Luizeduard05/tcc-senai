import { Text, View, Platform, StyleSheet, StatusBar, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

import carro1 from '../../assets/carro1.png';
import carro2 from '../../assets/carro2.png'; 

export default function Intranet() {
    return (
        <LinearGradient 
            colors={['#000000', '#434343']} 
            style={styles.androidSafeArea} 
        >
            <View style={styles.container}>
                <Text style={styles.title}>Olá, seja bem vindo a Rota Car</Text>

                {/* Botões */}
                <View style={styles.alinhaLateral}>
                    <Pressable style={styles.button}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </Pressable>

                    <Pressable style={styles.button}>
                        <Text style={styles.textButton}>Login</Text>
                    </Pressable>
                </View>

                {/* Imagens */}
                <View style={styles.carrosContainer}>
                    <Image
                        source={carro2}
                        style={styles.carImage}
                    />
                    <Image
                        source={carro1} 
                        style={styles.carImage}
                    />
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 100,
    },
    title: {
        color: "#FFF",
        fontWeight: "900",
        marginBottom: 40, 
    },
    button: {
        backgroundColor: "#FF0032",
        width: 160,
        height: 40,  
        justifyContent: "center",
        alignItems: "center", 
        marginHorizontal: 20, 
        borderRadius: 30,
    },
    textButton: {
        color: "#fff",
    },
    alinhaLateral: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 100, 
    },
    carrosContainer: {
        flexDirection: "row", 
        justifyContent: "center",
        marginTop: 150,
    },
    carImage: {
        width: 150, 
        height: 100, 
        resizeMode: "contain", 
        marginHorizontal: 15, 
    },
});
