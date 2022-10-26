import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default ({ children }: { children: JSX.Element }) => (
  <ThemeProvider theme={theme}>{children} </ThemeProvider>
);
