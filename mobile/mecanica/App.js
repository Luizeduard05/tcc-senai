import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Intranet from './src/pages/intranet';
import Login from './src/pages/login';
import CadastroUser from './src/pages/cadastroUser';
import Home from './src/pages/Usuario/home';
import Historico from './src/pages/Usuario/historico';
import Agendamentos from './src/pages/Usuario/agendamentos';
import MecanicoHome from './src/pages/Mecanico/home';
import AdminHome from './src/pages/Adm/home';
import AgendamentosMecanico from './src/pages/Mecanico/agendamentos';
import HistoricoMecanico from './src/pages/Mecanico/historico';
import NovoOrcamentoMecanico from './src/pages/Mecanico/novoOrcamento';
import AgendamentosADM from './src/pages/Adm/agendamentos';
import NovoOrcamentoADM from './src/pages/Adm/novoOrcamento';
import HistoricoADM from './src/pages/Adm/historico';
import NovaPeca from './src/pages/Adm/novaPeca';
import VisualizaPeca from './src/pages/Adm/VisualizaPeca';
import AddCarro from './src/pages/Usuario/AddCarro';
import CadastroAdmMec from './src/pages/Adm/cadastroAdmMec';
import GerenciaUser from './src/pages/Adm/GerenciaUser';
import Sobre from './src/pages/Usuario/sobre';
import NovoAgendamento from './src/pages/Adm/novoAgendamento';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// INICIO NAVEGAÇÃO USUARIO
function UserDrawer() { // Drawer para o usuário
  const { logout } = useAuth()
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
          headerRight: () => (  // Adiciona o botão de logout com ícone no canto superior direito
            <TouchableOpacity
              onPress={() => {
                logout();
              }}
            >
              <FontAwesome name="sign-out" size={25} color="#FFF" style={{ marginRight: 6, padding: 13 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="AgendamentosDrawer"
        component={Agendamentos}
        options={{
          title: 'Agendamentos',
          headerTintColor: "#fff",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
      <Drawer.Screen
        name="HistoricoDrawer"
        component={Historico}
        options={{
          title: 'Historico',
          headerTintColor: "#fff",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
      <Drawer.Screen
        name="VeiculosDrawer"
        component={AddCarro}
        options={{
          title: 'Meus veiculos',
          headerTintColor: "#fff",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
      <Drawer.Screen
        name="Sobre"
        component={Sobre}
        options={{
          title: 'Sobre nós',
          headerTintColor: "#fff",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function UserStack() { // Stack para o usuario
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserDrawer"
        component={UserDrawer}
        options={{ headerShown: false }}
      />
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
// FIM NAVEGAÇÃO USUARIO

// INICIO NAVEGAÇÃO MECANICO
function MechanicDrawer() { // Drawer para mecânico
  const { logout } = useAuth()
  return (
    <Drawer.Navigator
      initialRouteName="MecanicoHome"
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
        component={MecanicoHome}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Início',
          headerRight: () => (  // Adiciona o botão de logout com ícone no canto superior direito
            <TouchableOpacity
              onPress={() => {
                logout();
              }}
            >
              <FontAwesome name="sign-out" size={25} color="#FFF" style={{ marginRight: 6, padding: 13 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name='HistoricoMecanico'
        component={HistoricoMecanico}
        options={{
          title: 'Historico',
          headerTintColor: "#fff",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
      <Drawer.Screen
        name="Agendamentos"
        component={AgendamentosMecanico}
        options={{
          title: 'Agendamentos',
          headerTintColor: "#fff",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
      <Drawer.Screen
        name="MontarOrcamento"
        component={NovoOrcamentoMecanico}
        options={{
          title: 'Novo Orçamento',
          headerTintColor: "#fff",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000'
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function MechanicStack() { // Stack de mecânico
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MechanicDrawer"
        component={MechanicDrawer}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="AgendamentosMecanico"
        component={AgendamentosMecanico}
        options={{
          title: 'Agendamentos',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="MontarOrcamentoMecanico"
        component={NovoOrcamentoMecanico}
        options={{
          title: 'Novo orçamento',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />

    </Stack.Navigator>
  );
}
// FIM NAVEGAÇÃO MECANICO

// INICIO NAVEGAÇAO ADM
function AdminDrawer() { // Drawer para administrador
  const { logout } = useAuth()
  return (
    <Drawer.Navigator
      initialRouteName="AdminHome"
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
        component={AdminHome}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Início',
          headerRight: () => (  // Adiciona o botão de logout com ícone no canto superior direito
            <TouchableOpacity
              onPress={() => {
                logout();
              }}
            >
              <FontAwesome name="sign-out" size={25} color="#FFF" style={{ marginRight: 6, padding: 13 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="HistoricoADM"
        component={HistoricoADM}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Historico',
        }}
      />
      <Drawer.Screen
        name="NovoAgendamentoADM"
        component={NovoAgendamento}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Criar agendamento',
        }}
      />
      <Drawer.Screen
        name="AgendamentoADM"
        component={AgendamentosADM}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Agendamentos',
        }}
      />
      <Drawer.Screen
        name="NovoOrcamentoADM"
        component={NovoOrcamentoADM}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Novo Orçamento',
        }}
      />
      <Drawer.Screen
        name="NovaPecaADM"
        component={NovaPeca}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Cadastro de peças',
        }}
      />
      <Drawer.Screen
        name="VisualizaPecaADM"
        component={VisualizaPeca}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Estoque de peças',
        }}
      />
      <Drawer.Screen
        name="CadastroTipo"
        component={CadastroAdmMec}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Cadastro Funcionario',
        }}
      />
      <Drawer.Screen
        name="GerenciaUser"
        component={GerenciaUser}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          title: 'Gerenciamento de usuarios',
        }}
      />
    </Drawer.Navigator>
  );
}


function AdminStack() { // Stack de administrador
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminDrawer"
        component={AdminDrawer}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="AgendamentosADM"
        component={AgendamentosADM}
        options={{
          title: 'Agendamentos',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="NovosOrcamentoADM"
        component={NovoOrcamentoADM}
        options={{
          title: 'Novo Orçamento',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

function LogoutStack() { // Stack quando o usuario estiver deslogado
  return (
    <Stack.Navigator initialRouteName='Intranet'>
      <Stack.Screen
        name="Intranet"
        component={Intranet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CadastroUser"
        component={CadastroUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

// FIM NAVEGAÇÃO ADM

// Navegador principal que escolhe a stack com base no tipo de usuário
function AppNavigator() {
  const { userType } = useAuth();

  return (
    <Stack.Navigator>
      {(() => {
        switch (userType) {
          case 'MEC':
            return <Stack.Screen name="MechanicStack" component={MechanicStack} options={{ headerShown: false }} />;
          case 'CLI':
            return <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />;
          case 'ADM':
            return <Stack.Screen name="AdminStack" component={AdminStack} options={{ headerShown: false }} />;
          default:
            // Caso userType seja null ou não corresponda a nenhum dos casos acima
            return <Stack.Screen name="LogoutStack" component={LogoutStack} options={{ headerShown: false }} />;;
        }
      })()}
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
