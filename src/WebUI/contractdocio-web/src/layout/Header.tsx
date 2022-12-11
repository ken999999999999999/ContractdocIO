import { useRef } from 'react';
import { AppBar, Icon, Toolbar, Typography } from '@mui/material';
import { Button, Box } from '@/lib';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useAuth } from 'react-oidc-context';
import Drawer, { IDrawerRef } from './Drawer';
import { useNavigate } from 'react-router-dom';
import icon from '@/asset/icon.svg';

export default (): JSX.Element => {
  const auth = useAuth();
  const drawerRef = useRef<IDrawerRef | null>(null);
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar component="nav">
        <Toolbar>
          <Icon
            children={<img src={icon} alt="icon" />}
            style={{ width: '40px', height: '40px', marginRight: '5px' }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
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
