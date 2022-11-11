import SendIcon from '@mui/icons-material/Send';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import IndexPage from '@/pages/index';
import NotFoundPage from '@/pages/404';
import ContractsPage from '@/pages/contracts';
import CreateContractPage from '@/pages/contracts/create-contract';
import ContractDetailPage from '@/pages/contracts/[contractId]';

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
    jsx: <ContractsPage />
  },
  {
    link: '/contracts/create-contract',
    title: 'Create Contracts',
    jsx: <CreateContractPage />
  },
  {
    link: '/contracts/:contractId',
    title: 'Built Contract Detail',
    jsx: <ContractDetailPage />
  },
  {
    link: '*',
    title: '404 - Not Found',
    jsx: <NotFoundPage />
  }
];

export default RouteList;
