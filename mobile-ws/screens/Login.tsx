import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Button } from '../components/ui/Button';
import { RootStackParamsList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import { useState } from 'react';
import { WS_URL_DEV } from '../utils/api';
import { useChatContext } from '../providers/ChatProvider';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'Login'
>;

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const { onLogin } = useChatContext();

  // Notify the server a new user has joined
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL_DEV, {
    share: true,
    filter: () => false,
  });

  function logInUser() {
    if (!username.trim() && readyState !== ReadyState.OPEN) {
      return;
    }
    sendJsonMessage({
      username,
      type: 'user',
    });
    onLogin && onLogin(username);
    navigation.navigate('InteractionArea');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background-gradient.png')}
        resizeMode='cover'
        style={styles.image}
      >
        <View style={styles.loginBox}>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.joinText}>Join the chat</Text>
          </View>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholder='Enter your username'
          />
          <Button
            onPress={logInUser}
            viewStyle={styles.joinButtonView}
            textStyle={styles.joinButtonText}
          >
            Join
          </Button>
        </View>

        <View style={styles.exitButtonView}>
          <Button
            onPress={() => navigation.navigate('Welcome')}
            viewStyle={{ backgroundColor: '#000' }}
            textStyle={{ fontSize: 16 }}
          >
            Exit
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  loginBox: {
    backgroundColor: '#E0F7FA',
    marginTop: 30,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '90%',
    borderColor: '#3F51B5',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 20,
  },
  textContainer: {
    justifyContent: 'flex-start',
  },
  welcomeText: {
    marginVertical: 8,
    textTransform: 'uppercase',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  joinText: {
    paddingTop: 8,
    marginVertical: 8,
    fontSize: 18,
    color: '#6B7280',
  },
  input: {
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#9CA3AF',
    width: 300,
  },
  joinButtonView: {
    backgroundColor: '#3B82F6',
    marginTop: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: 'center',
  },
  joinButtonText: {
    fontSize: 20,
    color: '#F1F5F9',
    fontWeight: 'bold',
  },
  exitButtonView: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginTop: 80,
  },
});
