import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Button } from '../components/ui/Button';
import { RootStackParamsList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import { useState } from 'react';
import { WS_URL_DEV } from '../utils/api';
import { useChatContext } from '../providers/ChatProvider';
import Colors from '../utils/colors';

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
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.centerContent}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Welcome!</Text>
          <Text style={styles.subHeaderText}>Join the chat</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholder='Enter your username'
            placeholderTextColor={Colors.yellowParagraph}
          />
          <Pressable style={styles.loginButton} onPress={logInUser}>
            <Text style={styles.loginButtonText}>Join</Text>
          </Pressable>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <Pressable
          style={styles.exitButton}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.exitButtonText}>Exit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBackground,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30, // Spacing between header and input
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.greenHeader,
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 18,
    color: Colors.greenParagraph,
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: Colors.yellowHeader,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    color: Colors.yellowHeader,
  },
  loginButton: {
    backgroundColor: Colors.greenBackground,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 16,
    color: Colors.pinkHeader,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  exitButton: {
    backgroundColor: Colors.blueHeader,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  exitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
