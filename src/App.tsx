import { ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider } from './routers/RouterProvider';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#FFA94D',
        main: '#FE7405',
        dark: '#D34F00',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider />
    </ThemeProvider>
  );
}

export default App;
