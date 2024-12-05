import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { MainPage } from './pages/main';
import AiChatAssistant from './components/AIChat';
import './index.css';

function App() {
  const [isAiChatOpen, setAiChatOpen] = useState(false);

  const handleOpenAiChat = () => setAiChatOpen(true);
  const handleCloseAiChat = () => setAiChatOpen(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' color='secondary'>
          <Toolbar
            variant='dense'
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='chat'
              sx={{ mr: 2 }}
            >
              <WhatsAppIcon />
            </IconButton>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ flexGrow: 1, textAlign: 'center', marginRight: 'auto' }}
            >
              HAWK Chat App
            </Typography>
            {/* Button to trigger AI Chat */}
            <Button
              variant='contained'
              color='primary'
              onClick={handleOpenAiChat}
            >
              Open AI Chat
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <MainPage />
      {/* Modal to display AI Chat Assistant */}
      <Modal
        open={isAiChatOpen}
        onClose={handleCloseAiChat}
        aria-labelledby='ai-chat-modal-title'
        aria-describedby='ai-chat-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            outline: 'none',
          }}
        >
          <AiChatAssistant />
        </Box>
      </Modal>
    </>
  );
}

export default App;
