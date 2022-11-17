import { AppRouter } from './routes';
import { AuthConfigProvider } from './auth';
import ThemeProvider from '@/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '@/auth';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from '@/lib/SnackbarUtils';
import { handleError } from '@/api/common';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError
    },
    mutations: {
      cacheTime: 0,
      onError: handleError
    }
  }
});

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthConfigProvider>
        <ThemeProvider>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          >
            <SnackbarUtilsConfigurator />
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <AppRouter />
              </QueryClientProvider>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthConfigProvider>
    </BrowserRouter>
  );
};

export default App;
