import MuiCard, { CardProps } from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardHeader from '@mui/material/CardHeader';
import { ReactNode } from 'react';
interface ICard extends CardProps {
  title?: string;
  action?: ReactNode;
  children?: ReactNode;
}

export default ({ title, action, children, ...rest }: ICard) => (
  <MuiCard {...rest}>
    <MuiCardHeader action={action} title={title} />
    <MuiCardContent>{children}</MuiCardContent>
  </MuiCard>
);
