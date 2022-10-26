import Header from './Header';
import { Box } from '@mui/material';

interface ILayout {
  children: JSX.Element;
}

export default ({ children }: ILayout): JSX.Element => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};
