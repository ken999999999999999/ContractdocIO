import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Button } from '@/lib';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from 'react-oidc-context';

export default (): JSX.Element => {
  const auth = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contract.IO
          </Typography>
          <Button
            startIcon={<LogoutIcon />}
            onClick={() => auth.signoutRedirect()}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
