import Button, { IButton } from './Button';
import SendIcon from '@mui/icons-material/Send';

export default ({ startIcon, ...rest }: IButton): JSX.Element => (
  <Button startIcon={startIcon ?? <SendIcon />} variant="contained" {...rest} />
);
