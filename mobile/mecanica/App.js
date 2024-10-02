import 'react-native-gesture-handler';
import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Intranet from './src/pages/intranet';
import Login from './src/pages/login';
import Home from './src/pages/home';
import Sobre from './src/pages/sobre';
import Historico from './src/pages/historico';
import Agendamentos from './src/pages/agendamentos';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      drawerStyle: {
        backgroundColor: 'black',
      },
      drawerLabelStyle: {
        color: '#fff',
      }
    }}>
      <Drawer.Screen name="Home" component={Home} options={{
        title: 'Home',
        headerTitle: "",
        headerStyle: {
          backgroundColor: '#000', 
        },
        headerTintColor: '#fff', 
      }} />
      <Drawer.Screen name="Sobre nós" component={Sobre}  options={{
        title: 'Histórico',
        headerStyle: {
          backgroundColor: '#000', 
        },
        headerTintColor: '#fff', 
      }}  />
      <Drawer.Screen name="Histórico" component={Historico} />
      <Drawer.Screen name="Agendamentos" component={Agendamentos} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Inicio'
            component={Intranet}
            options={{
              title: 'Home',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              title: 'Login',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Drawer'
            component={DrawerNavigation}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
