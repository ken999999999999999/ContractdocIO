import MuiIconButton from '@mui/material/IconButton';
import { IconButtonProps } from '@mui/material';

//interface IButton extends ButtonProps {}

export default ({ children, ...rest }: IconButtonProps) => (
  <MuiIconButton {...rest}>{children}</MuiIconButton>
);
