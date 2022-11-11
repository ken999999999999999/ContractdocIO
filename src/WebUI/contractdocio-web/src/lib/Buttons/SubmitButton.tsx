import Button, { IButton } from './Button';
import SendIcon from '@mui/icons-material/Send';

export default ({ ...rest }: IButton): JSX.Element => (
  <Button startIcon={<SendIcon />} type="submit" variant="contained" {...rest}>
    Submit
  </Button>
);
