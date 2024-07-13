import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Tooltip } from 'react-native-paper';
import useWebSocket, { ReadyState } from 'react-native-use-websocket';
import { WS_URL_DEV, isUserEvent } from '../utils/api';
import { stringAvatar } from '../utils/helpers';

export function UserInfo() {
  // Info about the users
  const { lastJsonMessage } = useWebSocket(WS_URL_DEV, {
    share: true,
    filter: isUserEvent,
  });

  const users = Object.values(lastJsonMessage?.data?.users || {});

  if (!users || users.length === 0) {
    return (
      <View style={styles.noUsersContainer}>
        <Text style={styles.noUsersText}>No Users have joined</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {users.map((user: any) => (
        <View key={user.username} style={styles.userContainer}>
          <Tooltip title={user.username}>
            <Avatar.Text
              size={40}
              label={stringAvatar(user.username)}
              style={styles.avatar}
            />
          </Tooltip>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 100,
  },
  userContainer: {
    marginRight: 16,
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#6200ea',
  },
  noUsersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noUsersText: {
    fontSize: 16,
    color: '#888',
  },
});
