import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5eb8ff',
      main: '#0288d1',
      dark: '#005b9f',
      contrastText: '#000',
    },
  },
  sizing: {
    marginLeft: 250,
    marginRight: 350,
    marginTop: 60,
  }
});