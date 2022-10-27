import { useRef } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Button, Box } from '@/lib';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useAuth } from 'react-oidc-context';
import Drawer, { IDrawerRef } from './Drawer';

export default (): JSX.Element => {
  const auth = useAuth();
  const drawerRef = useRef<IDrawerRef | null>(null);
  return (
    <Box>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Contract.IO - Create your own contract
          </Typography>
          <Button
            color="inherit"
            startIcon={<MenuOpenIcon />}
            onClick={() => drawerRef?.current?.open()}
          >
            <Typography variant="h6" component="div">
              {`Hi, ${auth.user?.profile?.name ?? ''}`}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer ref={drawerRef} />
    </Box>
  );
};
