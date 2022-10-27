import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/theme/global.css';
import reportWebVitals from './reportWebVitals';
import { AuthConfigProvider } from './auth';
import ThemeProvider from '@/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { AppRouter } from './routes';
import { AuthProvider } from '@/auth';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthConfigProvider>
      <ThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </AuthConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
