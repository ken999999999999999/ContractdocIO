import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface IBoolIcon {
  isTrue?: boolean;
}

export default ({ isTrue }: IBoolIcon): JSX.Element =>
  isTrue ? <CheckCircleOutlineOutlinedIcon /> : <CancelOutlinedIcon />;
