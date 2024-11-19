import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/Login';
import { InteractionArea } from './screens/InteractionArea';
import { WelcomeScreen } from './screens/Welcome';
import { ChatProvider } from './providers/ChatProvider';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import Colors from './utils/colors';

export type RootStackParamsList = {
  Welcome: undefined;
  Login: undefined;
  InteractionArea: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

const Navigation = () => {
  return (
    <ChatProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name='Welcome'
            component={WelcomeScreen}
            options={{ cardStyle: { backgroundColor: Colors.blueBackground } }}
          />
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ cardStyle: { backgroundColor: Colors.blueBackground } }}
          />
          <Stack.Screen
            name='InteractionArea'
            component={InteractionArea}
            options={{ cardStyle: { backgroundColor: Colors.blueBackground } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ChatProvider>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Render a loading screen if fonts aren't loaded yet
  }
  return (
    <>
      <Navigation />
      <StatusBar style='auto' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
