import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export function Button({
  children,
  onPress,
  viewStyle,
  textStyle,
}: {
  children: string;
  onPress: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, viewStyle]}
      onPress={onPress}
    >
      <View>
        <Text style={textStyle}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#0000FF',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
