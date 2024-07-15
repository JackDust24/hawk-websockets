import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Button } from '../components/ui/Button';
import { RootStackParamsList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import useWebSocket from 'react-native-use-websocket';
import { WS_URL_DEV } from '../utils/api';
import { useChatContext } from '../providers/ChatProvider';
import { UserInfo } from '../components/UserInfo';
import { ChatArea } from '../components/ChatArea';

type InteractiveScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'InteractionArea'
>;

export function InteractionArea() {
  const navigation = useNavigation<InteractiveScreenNavigationProp>();
  const { onLogout } = useChatContext();

  // Notify the server a new user has joined
  useWebSocket(WS_URL_DEV, {
    share: true,
    filter: () => false,
  });

  function logoustUser() {
    onLogout && onLogout();
    navigation.navigate('Welcome');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background-gradient.png')}
        resizeMode='cover'
        style={styles.image}
      >
        <View style={styles.userBox}>
          <View style={styles.textContainer}>
            <Text style={styles.interactionText}>Chat Area - Users:</Text>
          </View>
          <UserInfo />
        </View>
        <View style={styles.chatArea}>
          <ChatArea />
        </View>
        <View style={styles.exitButtonView}>
          <Button
            onPress={logoustUser}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
  userBox: {
    marginTop: 100,
    justifyContent: 'flex-start',
    backgroundColor: '#E0F7FA',
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
    zIndex: 1,
  },
  chatArea: {
    flexGrow: 1,
    marginHorizontal: 20,
    marginVertical: 16,
    width: '90%',
    backgroundColor: 'transparent',
    borderColor: '#3F51B5',
    borderWidth: 2,
    borderRadius: 50,
  },
  textContainer: {
    justifyContent: 'flex-start',
  },
  interactionText: {
    marginVertical: 8,
    textTransform: 'uppercase',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  exitButtonView: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginVertical: 40,
  },
});
