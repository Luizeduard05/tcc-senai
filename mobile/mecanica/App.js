// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider, useAuth} from './src/context/AuthContext';

// Importando telas
import Intranet from './src/pages/intranet';
import Login from './src/pages/login';
import CadastroUser from './src/pages/cadastroUser';
import Home from './src/pages/Usuario/home';
import Historico from './src/pages/Usuario/historico';
import Agendamentos from './src/pages/Usuario/agendamentos';
import MecanicoHome from './src/pages/Mecanico/home';
import AdminHome from './src/pages/Adm/home';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function UserDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Historico" component={Historico} />
      <Drawer.Screen name="Agendamentos" component={Agendamentos} />
    </Drawer.Navigator>
  );
}

function MechanicDrawer() {
  return (
    <Drawer.Navigator initialRouteName="MecanicoHome">
      <Drawer.Screen name="Home" component={MecanicoHome} />
    </Drawer.Navigator>
  );
}

function AdminDrawer() {
  return (
    <Drawer.Navigator initialRouteName="AdminHome">
      <Drawer.Screen name="Home" component={AdminHome} />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  const { userType } = useAuth();

  return (
    <Stack.Navigator>
      {userType ? (
        userType === "mecanico" ? (
          <Stack.Screen name="MechanicDrawer" component={MechanicDrawer} options={{ headerShown: false }} />
        ) : userType === "usuario" ? (
          <Stack.Screen name="UserDrawer" component={UserDrawer} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="AdminDrawer" component={AdminDrawer} options={{ headerShown: false }} />
        )
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="CadastroUser" component={CadastroUser} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
