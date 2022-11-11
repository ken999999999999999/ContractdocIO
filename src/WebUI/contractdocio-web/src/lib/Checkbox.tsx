import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';

export default ({ ...rest }: CheckboxProps): JSX.Element => (
  <MuiCheckbox {...rest} />
);
