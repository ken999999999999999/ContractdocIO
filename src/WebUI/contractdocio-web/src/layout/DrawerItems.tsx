import MarkunreadIcon from '@mui/icons-material/Markunread';
import SendIcon from '@mui/icons-material/Send';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

interface IDrawerItems {
  key: string;
  title: string;
  icon: JSX.Element;
}

const DrawerItems: Array<IDrawerItems> = [
  {
    key: '/',
    title: 'Received Contracts',
    icon: <MarkunreadIcon />
  },
  {
    key: '/sent-contract/',
    title: 'Sent Contracts',
    icon: <SendIcon />
  },
  {
    key: '/built-contracts/',
    title: 'Built Contracts',
    icon: <CreateNewFolderIcon />
  }
];

export default DrawerItems;
