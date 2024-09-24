import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"

import Header from '../../components/header';
import Carrosel from '../../components/carrosel';
import CardServico from '../../components/cardServico';
import CardSobre from '../../components/cardSobre';

export default function Home() {
  return (
    <SafeAreaView style={styles.container} >
      <Header />
      <Carrosel />
      <View style={styles.contentWelcome} >
        <Text style={styles.contentText}>Bem vindo a Rota Car!</Text>
      </View>
      <CardServico />
      <CardSobre />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#abb2b9"
  },
  contentWelcome: {
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    // paddingTop: 10

  },
  contentText: {
    fontWeight: "bold",
    padding: 10,
    fontSize: 20
  }
});


