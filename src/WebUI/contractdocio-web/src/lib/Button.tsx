import MuiButton from '@mui/material/Button';
import { ButtonProps } from '@mui/material';

//interface IButton extends ButtonProps {}

export default ({ variant = 'outlined', children, ...rest }: ButtonProps) => (
  <MuiButton variant={variant} {...rest}>
    {children}
  </MuiButton>
);
