import Button, { IButton } from './Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default ({ startIcon, ...rest }: IButton): JSX.Element => (
  <Button
    startIcon={startIcon ?? <RestartAltIcon />}
    type="reset"
    variant="contained"
    color="error"
    {...rest}
  />
);
