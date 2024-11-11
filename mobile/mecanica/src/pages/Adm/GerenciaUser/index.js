import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, FlatList, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const usersData = [
    { id: '1', name: 'João Silva', email: 'joao@example.com' },
    { id: '2', name: 'Maria Oliveira', email: 'maria@example.com' },
    { id: '3', name: 'Carlos Pereira', email: 'carlos@example.com' },
];

export default function GerenciaUser() {
    const handleEdit = () => {
        console.log("Usuario excluido")
    };

    const handleDelete = (userId) => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir este usuário?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: () => {
                        console.log(`Usuário excluído`);
                    },
                },
            ]
        );
    };

    const renderUserItem = ({ item }) => (
        <View style={styles.userItem}>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEdit(item.id)}
                >
                    <FontAwesome name="edit" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: 'red' }]}
                    onPress={() => handleDelete(item.id)}
                >
                    <FontAwesome name="trash" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
        <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.5)']} style={styles.androidSafeArea}>
            <FlatList
                data={usersData}
                keyExtractor={(item) => item.id}
                renderItem={renderUserItem}
                contentContainerStyle={styles.userList}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    userList: {
        padding: 10,
    },
    userItem: {
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})