import MarkunreadIcon from '@mui/icons-material/Markunread';
import SendIcon from '@mui/icons-material/Send';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

interface IPageItem {
  key: string;
  title: string;
  icon: JSX.Element;
}

const PageItems: Array<IPageItem> = [
  {
    key: '/',
    title: 'My Contracts',
    icon: <SendIcon />
  },
  {
    key: '/create-contracts/',
    title: 'Create Contracts',
    icon: <CreateNewFolderIcon />
  },
  {
    key: '/received-contracts/',
    title: 'Received Contracts',
    icon: <MarkunreadIcon />
  }
];

export default PageItems;
