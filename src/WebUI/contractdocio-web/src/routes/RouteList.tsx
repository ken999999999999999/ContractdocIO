import SendIcon from '@mui/icons-material/Send';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import IndexPage from '@/pages/index';
import NotFoundPage from '@/pages/404';

interface IRouteList {
  link: string;
  title: string;
  jsx: JSX.Element;
}

const RouteList: Array<IRouteList> = [
  {
    link: '/',
    title: 'Received Contracts',
    jsx: <IndexPage />
  },
  {
    link: '/sent-contract/',
    title: 'Sent Contracts',
    jsx: <SendIcon />
  },
  {
    link: '/built-contracts/',
    title: 'Built Contracts',
    jsx: <CreateNewFolderIcon />
  },
  {
    link: '*',
    title: '404 - Not Found',
    jsx: <NotFoundPage />
  }
];

export default RouteList;
