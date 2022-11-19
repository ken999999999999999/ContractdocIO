import Button, { IButton } from './Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from './IconButton';

export default ({ children, ...rest }: IButton): JSX.Element =>
  children ? (
    <Button variant="outlined" startIcon={<EditIcon />} {...rest}>
      {children}
    </Button>
  ) : (
    <IconButton variant="outlined" children={<EditIcon />} {...rest} />
  );
