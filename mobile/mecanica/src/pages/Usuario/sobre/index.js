import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Linking } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Sobre() {

    const openInstagram = () => { // Função de redirecionamento para o instagram
        Linking.openURL('https://www.instagram.com/oficina_rotacar?igsh=MTlqNnlza2Q3NzNp');
    };

    const openWhatsApp = () => { // Função de redirecionamento para wpp
        Linking.openURL('https://wa.me/5591999999999'); 
    };

    return (
        <LinearGradient
            colors={['#000000', 'rgba(0, 0, 0, 0.7)']}
            style={styles.androidSafeArea}
        >
            <View style={styles.container}>
                <Text style={styles.title}>RotaCar</Text>
                <Text style={styles.description}>
                    Bem-vindo à nossa mecânica! Oferecemos serviços de alta qualidade para todos os tipos de veículos, garantindo a segurança e a satisfação dos nossos clientes. Nossa equipe é composta por profissionais experientes, prontos para atender você.
                </Text>
                
                <View style={styles.socialContainer}>
                    <TouchableOpacity onPress={openInstagram} style={styles.iconButton}>
                        <MaterialCommunityIcons name="instagram" size={32} color="#E1306C" />
                        <Text style={styles.iconText}>Instagram</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={openWhatsApp} style={styles.iconButton}>
                        <MaterialCommunityIcons name="whatsapp" size={32} color="#25D366" />
                        <Text style={styles.iconText}>WhatsApp</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    iconButton: {
        alignItems: 'center',
    },
    iconText: {
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 5,
    },
});
