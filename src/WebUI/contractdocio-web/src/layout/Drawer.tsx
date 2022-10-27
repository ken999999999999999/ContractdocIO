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
import pageItems from './PageItems';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useAuth } from 'react-oidc-context';

export interface IDrawerRef {
  open: () => void;
}

export default forwardRef<IDrawerRef>((_, ref): JSX.Element => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();

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
        {pageItems.map((item) => (
          <ListItem key={item.key} disablePadding>
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
          <ListItemButton>
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
