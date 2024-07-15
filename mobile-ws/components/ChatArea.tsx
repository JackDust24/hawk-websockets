import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import { WS_URL_DEV, isContentEvent } from '../utils/api';
import { useChatContext } from '../providers/ChatProvider';

export function ChatArea() {
  const { username } = useChatContext();
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL_DEV, {
    share: true,
    filter: isContentEvent,
  });

  const [message, setMessage] = useState('');

  let content = lastJsonMessage?.data?.editorContent || [];

  if (!content) {
    return (
      <View style={styles.noContentContainer}>
        <Text style={styles.noContentText}>No Users have joined</Text>
      </View>
    );
  }

  function handleSendMessage() {
    sendJsonMessage({
      type: 'content',
      content: message,
      username: username,
    });
    setMessage('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder='Enter a message'
        />
        <Button title='Send' onPress={handleSendMessage} />
      </View>
      <View style={styles.chatArea}>
        <ImageBackground
          source={require('../assets/bground.jpg')}
          style={styles.chatBackground}
        >
          <View style={styles.overlay} />
          <ScrollView contentContainerStyle={styles.messageContainer}>
            {[...content].reverse().map((content, index) => (
              <Text
                key={`activity-${index}`}
                style={[
                  styles.message,
                  username === content.user && styles.ownMessage,
                ]}
              >
                {content.user}: {content.content}
              </Text>
            ))}
          </ScrollView>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  chatArea: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  chatBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  messageContainer: {
    flexGrow: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fully opaque background for text
  },
  ownMessage: {
    color: 'blue',
    textAlign: 'right',
  },
  noContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noContentText: {
    fontSize: 16,
    color: '#888',
  },
});
