import { LinearGradient } from "expo-linear-gradient";
import { Platform, StatusBar, StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api/api";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function PerfilMEC() {
  const { token, id } = useAuth();
  const [infoPerfil, setInfoPerfil] = useState([]); // Variavel para guardar as informações do usuario
  const perfil = infoPerfil[0] // Capturando o primeiro array que vem nas informações de usuario

  const getPerfil = async () => { // Requisição para trazer o perfil do usuario
    try {
      const response = await api.get(`/usuario/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setInfoPerfil(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { // Trazendo informações sobre o perfil na inicialização da pagina.
    getPerfil();
  }, []);

  return (
    <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {perfil ? (
          <View style={styles.card}>
            <Text style={styles.infoTitle}>Nome:</Text>
            <Text style={styles.infoValue}>{perfil.nome}</Text>

            <Text style={styles.infoTitle}>CPF:</Text>
            <Text style={styles.infoValue}>{perfil.cpf}</Text>

            <Text style={styles.infoTitle}>Telefone:</Text>
            <Text style={styles.infoValue}>{perfil.telefone}</Text>

            <Text style={styles.infoTitle}>Endereço:</Text>
            <Text style={styles.infoValue}>
              {perfil.logradouro}, {perfil.numero}, {perfil.bairro}, {perfil.estado} - {perfil.cep}
            </Text>

            <Text style={styles.infoTitle}>Email:</Text>
            <Text style={styles.infoValue}>{perfil.email}</Text>

            <TouchableOpacity style={styles.editButton}>
              <MaterialIcons name="edit" size={24} color="#fff" />
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.loading}>Carregando informações...</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  infoTitle: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoValue: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  loading: {
    color: "#aaa",
    fontSize: 16,
  },
});
