import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { Button } from '../components/ui/Button';
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
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background-gradient.png')}
        resizeMode='cover'
        style={styles.image}
      >
        <Text style={styles.header}>Welcome to HawkChat</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Click</Text>
          <Text
            style={[styles.text, { fontWeight: '700', marginHorizontal: 5 }]}
          >
            Enter
          </Text>
          <Text style={styles.text}>below to enter app</Text>
        </View>
        <View style={styles.buttonView}>
          <Button onPress={() => navigation.navigate(navigateRoute)}>
            Enter
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    color: '#f0e878',
    fontSize: 64,
    lineHeight: 84,
    fontWeight: 'semibold',
    textAlign: 'center',
    marginBottom: 40,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 28,
    lineHeight: 42,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  buttonView: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginTop: 80,
  },
});
