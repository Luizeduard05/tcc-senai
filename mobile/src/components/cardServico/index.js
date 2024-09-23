import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, Image, Pressable, Dimensions } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import PagerView from "react-native-pager-view";

export default function CardServico() {
    return (
        // inicio principais servicos
        <View style={styles.containerServicos}>
            <Text style={styles.title}>Principais serviços</Text>

            {/* inicio slider servicos */}
            <View style={styles.container}>
                <PagerView style={styles.pagerView} initialPage={0}>
                    <Pressable key={1}>
                        <Image
                            source={require("../../assets/motor.jpg")}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </Pressable>
                    <Pressable key={2}>
                        <Image
                            source={require("../../assets/image2t.png")}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </Pressable>

                </PagerView>
            </View>
            {/* inicio sobre nos */}
            <Text style={styles.title}>Sobre Nós</Text>

            <View style={styles.item}>
                <MaterialCommunityIcons name='instagram' size={25} color="#D61285" />
                <Text style={styles.textInfo}>@oficina_rotacar</Text>
            </View>


            <View style={styles.item}>
                <MaterialCommunityIcons name='whatsapp' size={25} color="#60D669" />
                <Text style={styles.textInfo}>(19) 97148-1498</Text>
            </View>

            <View style={styles.item}>
                <MaterialCommunityIcons name='pin' size={20} color="#FF0000" />
                <Text style={styles.textInfo}>Rua Moacir Matos, 340, Jardim Alvorada - Sumaré/SP</Text>
            </View>
            {/* fim sobre nos */}

        </View>
    )
}

const styles = StyleSheet.create({
    containerServicos: {
        backgroundColor: "#ff0000",
        width: "95%",
        height: 500,
        marginTop: 15,
        borderRadius: 15,
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontWeight: "condensed",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
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
    },
    item: {
        flexDirection: "row",
        marginBottom: 10,
        gap: 3,
    },
    container: {
        width: "100%",
        height: 200,
    },
    pagerView: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },

})