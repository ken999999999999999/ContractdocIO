import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import theme from './theme';

export default ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children} </ThemeProvider>
);
