import { MainPage } from './pages/main';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './index.css';

function App() {
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
          </Toolbar>
        </AppBar>
      </Box>
      <MainPage />
    </>
  );
}

export default App;
