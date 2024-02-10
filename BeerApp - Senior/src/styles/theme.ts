import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: grey[400],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export { theme };
