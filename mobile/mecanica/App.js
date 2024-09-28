import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intranet from './src/pages/intranet';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import Login from './src/pages/login';

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}