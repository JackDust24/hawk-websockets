import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { Button } from '../components/ui/Button';
import { RootStackParamsList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Set this so we can use typsafe for navigation
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  'Login'
>;

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background-gradient.png')}
        resizeMode='cover'
        style={styles.image}
      >
        <Text style={styles.header}>Login</Text>
        <View style={styles.textContainer}></View>
        <View style={styles.buttonView}>
          <Button onPress={() => navigation.navigate('Welcome')}>Exit</Button>
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
