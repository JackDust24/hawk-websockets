import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { WelcomeScreen } from './screens/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/Login';

export type RootStackParamsList = {
  Welcome: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{ cardStyle: { backgroundColor: '#8c4ef4' } }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ cardStyle: { backgroundColor: '#8c4ef4' } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
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
