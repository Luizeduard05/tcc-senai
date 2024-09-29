import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intranet from './src/pages/intranet';
import Login from './src/pages/login';
import Home from './src/pages/home';

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
          <Stack.Screen 
            name='Home'
            component={Home}
            options={{
              title: 'Home',
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}