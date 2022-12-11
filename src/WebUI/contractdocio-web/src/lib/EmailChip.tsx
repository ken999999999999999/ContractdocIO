import MuiChip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';

interface IEmailChip {
  email: string;
}

export default ({ email }: IEmailChip): JSX.Element => (
  <MuiChip icon={<FaceIcon />} label={email} />
);
