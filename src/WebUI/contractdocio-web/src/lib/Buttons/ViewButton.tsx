import Button, { IButton } from './Button';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom';

interface IViewButton extends IButton {
  to: string;
}

export default ({ to, ...rest }: IViewButton): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(to)} {...rest}>
      <SearchIcon />
    </Button>
  );
};
