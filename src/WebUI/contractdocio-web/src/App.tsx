import { AppRouter } from './routes';
import { AuthConfigProvider } from './auth';
import ThemeProvider from '@/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '@/auth';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthConfigProvider>
        <ThemeProvider>
          <CssBaseline />
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <AppRouter />
            </QueryClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </AuthConfigProvider>
    </BrowserRouter>
  );
};

export default App;
