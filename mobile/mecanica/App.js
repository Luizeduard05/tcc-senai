import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider, useAuth } from './src/context/AuthContext';

import Intranet from './src/pages/intranet';
import Login from './src/pages/login';
import CadastroUser from './src/pages/cadastroUser';
import Home from './src/pages/Usuario/home';
import Historico from './src/pages/Usuario/historico';
import Agendamentos from './src/pages/Usuario/agendamentos';
import MecanicoHome from './src/pages/Mecanico/home';
import AdminHome from './src/pages/Adm/home';
import AgendamentosMecanico from './src/pages/Mecanico/agendamentos';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack para Agendamentos
function AgendamentosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Agendamentos"
        component={Agendamentos}
        options={{
          title: 'Agendamentos',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

// Stack para Historico
function HistoricoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Historico"
        component={Historico}
        options={{
          title: 'Historico',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

// Drawer para o usuário
function UserDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'black',
        },
        drawerLabelStyle: {
          color: '#fff',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Início',
        }}
      />
      {/* Navegar para as stacks diretamente do Drawer */}
      <Drawer.Screen
        name="AgendamentosDrawer"
        component={AgendamentosStack} // Navega para o stack que contém Agendamentos
        options={{
          title: 'Agendamentos',
          headerTintColor: "#fff",
          headerShown: true,  // Alterar para true
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
      <Drawer.Screen
        name="HistoricoDrawer"
        component={HistoricoStack} // Navega para o stack que contém Historico
        options={{
          title: 'Historico',
          headerTintColor: "#fff",
          headerShown: true,  // Alterar para true
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
      <Drawer.Screen
        name='Sair'
        component={Intranet}
        options={{
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  );
}


function UserStack() {
  return (
    <Stack.Navigator>
      {/* Tela principal com o Drawer */}
      <Stack.Screen
        name="UserDrawer"
        component={UserDrawer}
        options={{ headerShown: false }}
      />
      {/* Telas empilhadas que terão o botão de voltar */}
      <Stack.Screen
        name="Agendamentos"
        component={Agendamentos}
        options={{
          title: 'Agendamentos',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Historico"
        component={Historico}
        options={{
          title: 'Historico',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

// Drawer para mecânico
function MechanicDrawer() {
  return (
    <Drawer.Navigator initialRouteName="MecanicoHome">
      <Drawer.Screen name="Home" component={MecanicoHome} />
      <Drawer.Screen name="Agendamentos" component={AgendamentosMecanico} />
    </Drawer.Navigator>
  );
}

// Stack de mecânico
function MechanicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MechanicDrawer" component={MechanicDrawer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Drawer para administrador
function AdminDrawer() {
  return (
    <Drawer.Navigator initialRouteName="AdminHome">
      <Drawer.Screen name="Home" component={AdminHome} />
    </Drawer.Navigator>
  );
}

// Stack de administrador
function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminDrawer" component={AdminDrawer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Navegador principal que escolhe a stack com base no tipo de usuário
function AppNavigator() {
  const { userType } = useAuth();

  return (
    <Stack.Navigator>
      {userType ? (
        userType === 'mecanico' ? (
          <Stack.Screen name="MechanicStack" component={MechanicStack} options={{ headerShown: false }} />
        ) : userType === 'usuario' ? (
          <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="AdminStack" component={AdminStack} options={{ headerShown: false }} />
        )
      ) : (
        <>
          <Stack.Screen name="Intranet" component={Intranet} options={{ headerShown: false }} />
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
