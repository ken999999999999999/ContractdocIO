import MuiButton from '@mui/material/Button';
import { ButtonProps } from '@mui/material';

export interface IButton extends ButtonProps {}

export default ({ children, ...rest }: IButton): JSX.Element => (
  <MuiButton variant="outlined" {...rest}>
    {children}
  </MuiButton>
);
