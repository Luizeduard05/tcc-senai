import { LinearGradient } from "expo-linear-gradient"; 
import { View, Text, Image, StyleSheet, Platform, StatusBar, TouchableOpacity } from "react-native"; 
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import carro3 from '../../../assets/carro3.png'; 
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";

export default function AdminHome() { 
    const navigation = useNavigation()
    const { nome } = useAuth()
    return ( 
        <LinearGradient 
            colors={['#000000', 'rgba(0, 0, 0, 0.5)']} 
            style={styles.androidSafeArea} 
        > 
            <LinearGradient 
                colors={['#FF0000', '#000000']} 
                style={styles.container} 
            > 
                <Text style={styles.greetingText}>Olá {nome}!</Text> 
                <Text style={styles.helpText}>Como podemos ajudar hoje?</Text> 

                {/* Área para a imagem */} 
                <View style={styles.imageContainer}> 
                    <Image source={carro3} style={styles.image} resizeMode="contain" /> 
                </View> 

                {/* Seção dos ícones */} 
                <View style={styles.iconSection}> 
                    <TouchableOpacity 
                        style={styles.iconContainer} 
                        onPress={() => navigation.navigate('AgendamentosADM')} 
                    > 
                        <View style={styles.menuLine} /> 
                        <Icon name="event" color="#ccc" size={30} style={styles.icon} /> 
                        <Text style={styles.iconText}>Agendamentos</Text> 
                    </TouchableOpacity> 

                    {/* Linha de divisão entre os ícones */}
                    <View style={styles.divider} /> 

                    <TouchableOpacity 
                        style={styles.iconContainer} 
                        onPress={() => navigation.navigate('NovosOrcamentoADM')} 
                    > 
                        <View style={styles.menuLine} /> 
                        <Icon name="table-chart" color="#ccc" size={30} style={styles.icon} /> 
                        <Text style={styles.iconText}>Montar orçamento</Text> 
                    </TouchableOpacity> 
                </View> 
            </LinearGradient> 
        </LinearGradient> 
    ); 
} 

const styles = StyleSheet.create({ 
    androidSafeArea: { 
        flex: 1, 
        justifyContent: 'center', 
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
    }, 
    container: { 
        flex: 0, 
        height: '80%',
        margin: 30, 
        borderRadius: 10, 
        justifyContent: 'space-between', 
        backgroundColor: '#FF0000', 
        elevation: 7, 
        shadowColor: '#ffffff', 
        shadowOffset: { 
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.3, 
        shadowRadius: 6, 
    }, 
    greetingText: { 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: '#fff', 
        alignSelf: 'flex-start', 
        paddingHorizontal: 20, 
        paddingTop: 20, 
    }, 
    helpText: { 
        fontSize: 20, 
        color: '#fff', 
        textAlign: 'center', 
        marginBottom: 100, 
    }, 
    imageContainer: { 
        width: '100%', 
        height: 300, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 50
    }, 
    image: { 
        width: '100%', 
        height: '100%', 
    }, 
    menuLine: { 
        width: '100%', 
        height: 1, 
        backgroundColor: '#ccc', 
        marginBottom: 4, 
    }, 
    iconSection: { 
        width: '100%', 
        backgroundColor: '#000', 
        paddingVertical: 4, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 20
    }, 
    iconContainer: { 
        alignItems: 'center', 
        width: '50%', 
    }, 
    divider: { 
        width: 1, 
        height: '100%',
        backgroundColor: '#ccc', 
    }, 
    icon: { 
        paddingHorizontal: 10, 
    }, 
    iconText: { 
        color: '#fff', 
        marginTop: 5, 
    }, 
}); 

