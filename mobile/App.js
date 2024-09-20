import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './src/pages/home';
import Login from './src/pages/login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home' 
            component={Home} 
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
              headerTintColor: "#fff",
              headerShown: true,  
              headerStyle:{
                backgroundColor: "black"
              }  
  
            }}  />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

