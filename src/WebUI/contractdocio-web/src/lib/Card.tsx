import MuiCard, { CardProps } from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardHeader from '@mui/material/CardHeader';
import { ReactNode } from 'react';
import Loading from './Loading';
interface ICard extends CardProps {
  header: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  loading?: boolean;
}

export default ({ header, action, loading, children, ...rest }: ICard) => (
  <>
    <MuiCard {...rest}>
      <MuiCardHeader action={action} title={header} />
      <MuiCardContent>{children}</MuiCardContent>
    </MuiCard>
    <Loading loading={!!loading} />
  </>
);
