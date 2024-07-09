import useWebSocket, { ReadyState } from 'react-use-websocket';
import React, { useState, useEffect } from 'react';
import { WS_URL } from '../api/websockets-helpers';
import { InteractionArea } from '../components/InteractionArea';
import { LoginSection } from '../components/Login';

export function MainPage() {
    const [username, setUsername] = useState('');

    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
      onOpen: () => {
        console.log("Connection Made with Server")
      },
      share: true,
      filter: () => false,
      retryOnError: true,
      shouldReconnect: () => true,
    });
  
    useEffect(() => {
      if (username && readyState === ReadyState.OPEN) {
        sendJsonMessage({
          username,
          type: 'user',
        });
      }
    }, [username, sendJsonMessage, readyState]);

    return (
        <div className='container-fluid'>
            {username ? <InteractionArea /> : <LoginSection onLogin={setUsername} />}
        </div>
    )
}