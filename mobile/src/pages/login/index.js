import React from 'react'
import { StyleSheet ,View, TextInput, Text, TouchableOpacity } from 'react-native'


export default function Login() {
    return (
        <View style={styles.container}>
          <View style={styles.containerLogin}>
            <Text style={styles.titles}>Rota Car</Text>
            <Text>Entre na sua conta para acessar informações</Text>
            <Text>Preencha todos os campos para realizar login</Text>

            <TextInput
                placeholder='E-mail'
                style={styles.inputs}
            />
            <TextInput
                placeholder='Senha'
                style={styles.inputs}
            />

            <TouchableOpacity style={styles.btnAcessar} >
                <Text style={styles.textBtn}>Acessar</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    containerLogin: {
      // alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#D9D9D9",
      width: "90%",
      height: "50%",
      borderRadius: 10
    },
    titles: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 25,
      color: "black",
    },
    inputs: {
      width: "90%",
      height: 50,
      backgroundColor: "#fff",
      padding: 10,
      fontSize: 16,
      borderRadius: 10,
      margin: 10
    },
    btnAcessar: {
      width: "90%",
      height: 50,
      backgroundColor: "#007AFF",
      justifyContent: "center",
      marginBottom: 30,
      alignItems: "center",
      borderRadius: 10,
      marginTop: 10
    },
    textBtn: {
      fontSize: 20,
      color: "#022135",
      fontWeight: "bold",
    }
  });