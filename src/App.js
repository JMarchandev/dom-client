import React from 'react';

// Redux 
import { useDispatch } from 'react-redux';

// Socket resquest
import openSocket from 'socket.io-client';

// Internal import
import Layout from './layout';
import { theme } from './theme';

// Material UI
import { ThemeProvider } from '@material-ui/core/styles'
import { setRenderStatus } from './redux/slices/NavigationSlice';

const socket = openSocket(process.env.REACT_APP_DOM_SOCKET, { transports: ['websocket'] });

function App() {
  const dispatch = useDispatch();

  socket.on('RENDER', (res) => {
    dispatch(setRenderStatus(true))
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
};

export default App;