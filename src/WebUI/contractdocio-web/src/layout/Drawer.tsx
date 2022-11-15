import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import drawerItems from './DrawerItems';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

export interface IDrawerRef {
  open: () => void;
}

export default forwardRef<IDrawerRef>((_, ref): JSX.Element => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true)
  }));

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      style={{ flexGrow: 1 }}
      anchor="right"
    >
      <List style={{ flexGrow: 1 }}>
        {drawerItems.map((item) => (
          <ListItem
            key={item.key}
            disablePadding
            onClick={() => {
              navigate(item.key);
              setOpen(false);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/Identity/Account/Manage">
            <ListItemIcon children={<SettingsIcon />} />
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => auth?.signoutRedirect()}>
            <ListItemIcon children={<LogoutIcon />} />
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
});
