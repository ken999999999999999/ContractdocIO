import { IButton } from './Button';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from './IconButton';
import { useNavigate } from 'react-router-dom';

interface IViewButton extends IButton {
  to: string;
}

export default ({ to, ...rest }: IViewButton): JSX.Element => {
  const navigate = useNavigate();
  return (
    <IconButton
      children={<SearchIcon />}
      onClick={() => navigate(to)}
      {...rest}
    />
  );
};
