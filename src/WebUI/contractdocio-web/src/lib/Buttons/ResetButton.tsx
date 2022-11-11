import Button, { IButton } from './Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default ({ ...rest }: IButton): JSX.Element => (
  <Button
    startIcon={<RestartAltIcon />}
    type="reset"
    variant="contained"
    color="error"
    {...rest}
  />
);
