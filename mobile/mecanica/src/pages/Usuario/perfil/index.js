import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, StatusBar, StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api/api";

export default function PerfilCLI() {
  const { token, id } = useAuth();
  const [infoPerfil, setInfoPerfil] = useState([]); // Variavel para guardar as informações do usuario
  const perfil = infoPerfil[0] // Capturando o primeiro array que vem nas informações de usuario

  // Dados passados para update
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");

  // Manipulando modal
  const [editModalVisible, setEditModalVisible] = useState(false);

  const getPerfil = async () => { // Requisição para trazer o perfil do usuario
    try {
      const response = await api.get(`/usuario/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setInfoPerfil(response.data.result); // Atribuindo a resposta da requisição a variavel
    } catch (error) {
      console.log(error);
    }
  };

  const putPerfil = async () => { // Requisição para atualizar usuario 
    try {
      const response = await api.put(`usuarios/${id}`, {
        nome: nome,
        cpf: cpf,
        email: email,
        logradouro: logradouro,
        bairro: bairro,
        estado: estado,
        numero: numero,
        complemento: complemento,
        cep: cep,
        telefone: telefone
      },
        { headers: { Authorization: `Token ${token}` } }
      )
      // console.log(response.data)
      setEditModalVisible(false)
      getPerfil()
      alert("Dados atualizados")
    } catch (error) {
      console.log(error)
      alert("Ocorreu um erro")
    }
  }

  const confirmEdit = () => { // Função do botão para iniciar edição
    // Atribuindo os dados do cliente ao modal de edicao
    setNome(perfil.nome)
    setCPF(perfil.cpf);
    setCep(perfil.cep)
    setLogradouro(perfil.logradouro)
    setNumero(perfil.numero)
    setBairro(perfil.bairro)
    setEstado(perfil.estado)
    setComplemento(perfil.complemento)
    setTelefone(perfil.telefone);
    setEmail(perfil.email);
    setEditModalVisible(true) // Ativando modal de edicao
  }

  const buscarCep = async () => { // Função para busca de CEP
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      // console.log(data)

      if (!data.erro) { // Se a resposta for diferente de erro atrela os valores ao input
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setEstado(data.uf);
      } else {
        alert("CEP não encontrado");
      }
    } catch (error) {
      console.log(error)
    }
  }

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

            <TouchableOpacity style={styles.editButton} onPress={confirmEdit}>
              <MaterialIcons name="edit" size={24} color="#fff" />
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.loading}>Carregando informações...</Text>
        )}

        {/* Modal de edição */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
            setEditModalVisible(false)
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => {
                setEditModalVisible(false);
              }}>
                <FontAwesome name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edicao de Cadastro</Text>

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={nome}
                onChangeText={(text) => setNome(text)}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={cpf}
                onChangeText={(text) => setCPF(text)}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={telefone}
                onChangeText={(text) => setTelefone(text)}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={cep}
                onBlur={buscarCep}
                onChangeText={(text) => setCep(text)}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                editable={false}
                value={logradouro}
                onChangeText={(text) => setLogradouro(text)}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={bairro}
                editable={false}
                onChangeText={setBairro}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={numero}
                onChangeText={(text) => setNumero(text)}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={estado}
                editable={false}
                onChangeText={setEstado}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={complemento}
                onChangeText={(text) => setComplemento(text)}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#cccccc"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <TouchableOpacity style={styles.button} onPress={putPerfil} >
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>

            </View>
          </View>

        </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  }, modalContent: {
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: "#ffffff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF4500",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  }
});
