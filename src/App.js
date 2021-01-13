import React from 'react';

// Internal import
import Layout from './layout';
import { theme } from './theme';

// Material UI
import { ThemeProvider } from '@material-ui/core/styles'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
};

export default App;