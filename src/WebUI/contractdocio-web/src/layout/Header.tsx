import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Button, IconButton } from '@/lib';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from 'react-oidc-context';

export default (): JSX.Element => {
  const auth = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            children={<MenuIcon />}
            style={{ marginRight: '5px' }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contract.IO
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: '5px' }}
          >
            {`Hi, ${auth.user?.profile?.name ?? ''}`}
          </Typography>
          <Button
            startIcon={<LogoutIcon />}
            color="inherit"
            onClick={() => auth.signoutRedirect()}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
