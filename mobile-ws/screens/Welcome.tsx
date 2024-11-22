import { StyleSheet, View, Text, Pressable, SafeAreaView } from 'react-native';
import Colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import { WS_URL_DEV } from '../utils/api';
import { useChatContext } from '../providers/ChatProvider';

// Set this so we can use typsafe for navigation
type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'Welcome'
>;

export function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const [registered, setRegistered] = useState(false);
  const { username, onLogin, isLoggedIn } = useChatContext();

  //
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL_DEV, {
    onOpen: () => {
      console.log('Connection Made with local Server');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (username && !registered) {
      sendJsonMessage({
        username,
        type: 'user',
      });
      setRegistered(true);
    }
  }, [username, readyState, isLoggedIn, sendJsonMessage]);

  const navigateRoute = isLoggedIn ? 'InteractionArea' : 'Login';

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section: Header */}

      {/* Middle Section: Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome to HawkRewards</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#E0F7FA' }]}>
          <Text style={[styles.cardTitle, { color: '#000' }]}>
            Your Rewards
          </Text>
          <Text style={[styles.cardDescription, { color: Colors.blueHeader }]}>
            Seamlessly find all your rewards in one place.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#E0F7FA' }]}>
          <Text style={[styles.cardTitle, { color: '#000' }]}>
            Receive Updates and Latest Discounts
          </Text>
          <Text style={[styles.cardDescription, { color: Colors.blueHeader }]}>
            Latest updates and chat with your rewards provider.
          </Text>
        </View>
      </View>

      {/* Bottom Section: Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate(navigateRoute)}
        >
          <Text style={styles.buttonText}>Enter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBackground,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1, // Takes available space
    justifyContent: 'center', // Centers vertically within available space
    paddingHorizontal: 20, // Adds padding for better spacing
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.greenBackground,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: Colors.greenHeader,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
