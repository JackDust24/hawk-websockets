import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './screens/Login';
import { HawkRewardsScreen } from './screens/HawkRewards';
import { ProfileScreen } from './screens/Profile';
import { RewardsScreen } from './screens/Rewards';
import { InfoScreen } from './screens/Info';
import { InteractionArea } from './screens/InteractionArea';
import { WelcomeScreen } from './screens/Welcome';
import { RewardDetailsScreen } from './screens/RewardDetails';
import { ChatProvider } from './providers/ChatProvider';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import Colors from './utils/colors';
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamsList = {
  Welcome: undefined;
  Login: undefined;
  InteractionArea: undefined;
  RewardsScreen: undefined;
  RewardDetail: { reward: any };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamsList>();

function HomeStack() {
  return (
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
  );
}

function RewardsStack() {
  return (
    <Stack.Navigator
      initialRouteName='RewardsScreen'
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name='RewardsScreen'
        component={RewardsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Rewards',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
            color: Colors.blueHeader,
          },
          headerLeft: () => null, // No back button
        }}
      />
      <Stack.Screen
        name='RewardDetail'
        component={RewardDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Rewards',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
            color: Colors.blueHeader,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'HawkRewards':
              iconName = 'pricetags';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Rewards':
              iconName = 'gift';
              break;
            case 'Info':
              iconName = 'information-circle';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.blueHeader,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeStack} />
      <Tab.Screen name='HawkRewards' component={HawkRewardsScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name='Rewards' component={RewardsStack} />
      <Tab.Screen name='Info' component={InfoScreen} />
    </Tab.Navigator>
  );
}

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
    return null;
  }
  return (
    <ChatProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
      <StatusBar style='auto' />
    </ChatProvider>
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
