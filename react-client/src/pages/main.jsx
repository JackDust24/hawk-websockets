import useWebSocket, { ReadyState } from 'react-use-websocket';
import React, { useState, useEffect } from 'react';
import { WS_URL } from '../api/websockets-helpers';
import { InteractionArea } from '../components/InteractionArea';
import { LoginSection } from '../components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export function MainPage() {
  const [username, setUsername] = useState('');

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('Connection Made with Server');
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
      {/* <CssBaseline /> */}
      <Container maxWidth='xl' sx={{ bgcolor: '#ecfeff' }}>
        {username ? (
          <InteractionArea />
        ) : (
          <LoginSection onLogin={setUsername} />
        )}
      </Container>
    </>
  );
}

{
  /* <React.Fragment>
<CssBaseline />
<Container maxWidth="sm">
  <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
</Container>
</React.Fragment> */
}
