import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CardSobre() {
    return(
        <View style={styles.sobre}>
        <Text style={styles.title}>Sobre Nós</Text>

        <View style={styles.item}>
        <MaterialCommunityIcons name='instagram' size={25} color="#D61285" />
        <Text style={styles.text}>@oficina_rotacar</Text>
        </View>

        <View style={styles.item}>
        <MaterialCommunityIcons name='whatsapp' size={25} color="#60D669" />
        <Text style={styles.text}>(19) 97148-1498</Text>
        </View>

        <View style={styles.item}>
        <MaterialCommunityIcons name='pin' size={20} color="#FF0000" />
        <Text style={styles.text}>Rua Moacir Matos, 340, Jardim Alvorada - Sumaré/SP</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    sobre: {
      backgroundColor: "#000000",
      width: "95%",
      height: 230,
      // marginTop:15,
      color: "#fff",
      borderRadius: 15,
      alignItems: 'center',
      margin: 10,
      padding: 20
    },
    title: {
        fontWeight: "condensed",
        color: "#fff",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 30
    },
    text: {
      fontSize: 16,
      color: "#fff",
    },
    item : {
        flexDirection: "row",
        marginBottom: 10,
        gap: 3,
    }
  });