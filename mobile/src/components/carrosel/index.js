import React from 'react';
import { Image, Pressable, View, StyleSheet, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";

export default function Carrosel() {
    return (
        <View style={styles.container}>
            <PagerView style={styles.pagerView} initialPage={0}>
                <Pressable key={1}>
                    <Image
                        source={require("../../assets/image1.png")}
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
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 170,
    },
    pagerView: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
