import { Text, View, Platform, StyleSheet, StatusBar, Pressable, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import carro1 from '../../assets/carro1.png';
import carro2 from '../../assets/carro2.png'; 
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Intranet() {
    const navigation = useNavigation();
    // const useRoute = useRoute()

    const navegaLogin = () => {
        navigation.navigate('Login')
    }

    const navegaHome = () => {
        navigation.navigate('Home')
    }

    return (
        <LinearGradient 
            colors={['#000000', 'rgba(0, 0, 0, 0.5)']} 
            style={styles.androidSafeArea} 
        >
            <View style={styles.container}>
                <Text style={styles.title}>Olá, seja bem vindo a Rota Car</Text>

                {/* Botões */}
                <View style={styles.alinhaLateral}>
                    <Pressable style={styles.button}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={navegaHome}>
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
        paddingTop: 175,
    },
    title: {
        color: "#FFF",
        fontSize: 20,
        marginBottom: 40, 
    },
    button: {
        backgroundColor: "#FF0032",
        width: 170,
        height: 50,  
        justifyContent: "center",
        alignItems: "center", 
        marginHorizontal: 20, 
        borderRadius: 30,
        
    },
    textButton: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },
    alinhaLateral: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 100, 
        padding: 5
    },
    carrosContainer: {
        flexDirection: "row", 
        justifyContent: "center",
        marginTop: 150,
    },
    carImage: {
        width: 200, 
        height: 125, 
        resizeMode: "contain", 
        marginHorizontal: 5, 
    },
});
