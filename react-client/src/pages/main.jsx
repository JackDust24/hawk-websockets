import useWebSocket, { ReadyState } from 'react-use-websocket';
import React, { useState, useEffect } from 'react';
import { WS_URL } from '../api/websockets-helpers';
import { InteractionArea } from '../components/InteractionArea';
import { LoginSection } from '../components/Login';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export function MainPage() {
  const [username, setUsername] = useState('');

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('Connection Made with Server');
    },
    onError: (error) => {
      console.error('WebSocket Error:', error);
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
    <>
      <Container maxWidth='xl' sx={{ bgcolor: '#ecfeff' }}>
        <Box
          sx={{
            bgcolor: '#ecfeff',
            height: '90vh',
            display: 'flex',
            overflowY: 'auto',
            margin: '20px',
          }}
        >
          {username ? (
            <InteractionArea username={username} />
          ) : (
            <LoginSection onLogin={setUsername} />
          )}
        </Box>
      </Container>
    </>
  );
}
