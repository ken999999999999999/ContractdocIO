import MuiStack, { StackProps } from '@mui/material/Stack';

export default ({ ...rest }: StackProps): JSX.Element => (
  <MuiStack direction="row" spacing={3} {...rest} />
);
