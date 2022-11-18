import Button, { IButton } from './Button';
import SendIcon from '@mui/icons-material/Send';

export default ({ startIcon, ...rest }: IButton): JSX.Element => (
  <Button
    startIcon={startIcon ?? <SendIcon />}
    type="submit"
    variant="contained"
    {...rest}
  />
);
