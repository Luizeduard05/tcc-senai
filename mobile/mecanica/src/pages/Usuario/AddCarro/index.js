import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Platform, StatusBar, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../../../services/api/api";

export default function AddCarro() {
    const { id, token } = useAuth();
    const [veiculos, setVeiculos] = useState([]);

    const [placa, setPlaca] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState("");

    const getVeiculos = async () => {
        try {
            const response = await api.get(`/veiculos/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data);
            setVeiculos(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const postVeiculo = async () => {
        try {
           const response = await api.post(
            `/veiculos/${id}`,
            {
                placa: placa,
                marca: marca,
                modelo: modelo,
                ano: ano
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
           );
        //    console.log(response.data) 
           setPlaca("");
           setMarca("");
           setModelo("");
           setAno("");
           alert(`Veiculo ${modelo} cadastrado com sucesso`)
           getVeiculos()

        } catch (error) {
            console.log(error)
            alert("Ocorreu um erro")
        }
    }

    useEffect(() => {
        getVeiculos()
    }, [])

    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Cadastro de Veículo</Text>

                <View style={styles.form}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Placa" 
                        placeholderTextColor="#cccccc" 
                        value={placa}
                        onChangeText={setPlaca}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Marca do veículo" 
                        placeholderTextColor="#cccccc" 
                        value={marca}
                        onChangeText={setMarca}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Modelo" 
                        placeholderTextColor="#cccccc" 
                        value={modelo}
                        onChangeText={setModelo}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ano" 
                        placeholderTextColor="#cccccc" 
                        value={ano}
                        onChangeText={setAno}
                    />

                    <TouchableOpacity style={styles.button} onPress={postVeiculo}>
                        <Text style={styles.buttonText}>Cadastrar Veículo</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subTitle}>Seus Veículos</Text>

                {veiculos.length > 0 ? (veiculos.map((veiculo) => (
                    <View style={styles.vehicleList} key={veiculo.id}>
                        <Text style={styles.vehicleItem}>{veiculo.modelo} - {veiculo.placa}</Text>
                    </View>
                ))
                ) : (<Text>Nenhuma veiculo Cadastrado</Text>)}



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
        flexGrow: 1,
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 20,
    },
    form: {
        width: "100%",
        marginBottom: 20,
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
        marginTop: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
    },
    vehicleList: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 8,
        padding: 12,
    },
    vehicleItem: {
        color: "#ffffff",
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.3)",
    },
});
