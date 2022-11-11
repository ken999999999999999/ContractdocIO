import Button, { IButton } from './Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from './IconButton';

export default ({ children, ...rest }: IButton): JSX.Element =>
  children ? (
    <Button startIcon={<AddIcon />} {...rest}>
      {children}
    </Button>
  ) : (
    <IconButton children={<AddIcon />} {...rest} />
  );
