import React from 'react';

// Redux 
import { useDispatch } from 'react-redux';

// Socket resquest
import WebSocket from 'socket.io-client';

// Internal import
import Layout from './layout';
import { theme } from './theme';

// Material UI
import { ThemeProvider } from '@material-ui/core/styles'
import { setRenderEquipments } from './redux/slices/NavigationSlice';

const socket = new WebSocket(process.env.REACT_APP_DEVICE_IP, { transports: ['websocket'] });

function App() {
  const dispatch = useDispatch();

  socket.on('SUCCESS_', (res) => {
    dispatch(setRenderEquipments(true))
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
};

export default App;