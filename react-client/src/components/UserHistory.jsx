import React from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL, isUserEvent } from '../api/websockets-helpers';

export function UserHistory() {
  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent,
  });

  const activities = lastJsonMessage?.data.userActivity || [];
  return (
    <ul>
      {activities.map((activity, index) => (
        <li key={`activity-${index}`}>{activity}</li>
      ))}
    </ul>
  );
}
