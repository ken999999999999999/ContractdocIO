import Header from './Header';
import { Box } from '@/lib';
import { Container } from '@mui/material';
import Seo from './Seo';

interface ILayout {
  children: React.ReactNode;
}

export default ({ children }: ILayout): JSX.Element => {
  return (
    <Box>
      <Seo />
      <Header />
      <Container
        style={{ marginTop: '64px' }}
        disableGutters
        maxWidth={false}
        sx={{ padding: '12px 24px' }}
      >
        {children}
      </Container>
    </Box>
  );
};
