import Header from './Header';
import { Box } from '@mui/material';
import Seo from './Seo';

interface ILayout {
  children: React.ReactNode;
}

export default ({ children }: ILayout): JSX.Element => {
  return (
    <Box>
      <Seo />
      <Header />
      {children}
    </Box>
  );
};
