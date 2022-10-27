import { AppRouter } from './routes';
import { AuthConfigProvider } from './auth';
import ThemeProvider from '@/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '@/auth';
import { BrowserRouter } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthConfigProvider>
        <ThemeProvider>
          <CssBaseline />
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ThemeProvider>
      </AuthConfigProvider>
    </BrowserRouter>
  );
};

export default App;
