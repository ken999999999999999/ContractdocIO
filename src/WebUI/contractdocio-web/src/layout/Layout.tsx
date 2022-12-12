import Header from './Header';
import { Box } from '@/lib';
import { Container } from '@mui/material';
import Seo from './Seo';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
interface ILayout {
  children: React.ReactNode;
}

export default ({ children }: ILayout): JSX.Element => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      <Seo />
      <Header />
      <Container
        style={{ marginTop: '64px' }}
        disableGutters
        maxWidth={false}
        sx={{ padding: matches ? '12px 24px' : '12px 0px' }}
      >
        {children}
      </Container>
    </Box>
  );
};
