import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Header() {
    const navigation = useNavigation();

    const navegaLogin = () => {
        navigation.navigate('Login');
    }


    return (
        <View style={styles.headerContainer}>
            <Text style={styles.homeText}>Home</Text>
            <Pressable style={styles.loginButton}>
                <Text style={styles.loginText} onPress={navegaLogin} >Login</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'black',
        width: '100%',
        position: 'relative',
    },
    homeText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#fff"
    },
    loginButton: {
        position: 'absolute',
        right: 15,
    },
    loginText: {
        fontSize: 16,
        color: '#007AFF',
    },
});