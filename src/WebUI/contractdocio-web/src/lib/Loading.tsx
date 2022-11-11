import MuiBackdrop from '@mui/material/Backdrop';
import MuiCircularProgress from '@mui/material/CircularProgress';

interface ILoading {
  loading: boolean;
}

export default ({ loading }: ILoading) => (
  <MuiBackdrop open={loading}>
    <MuiCircularProgress color="inherit" />
  </MuiBackdrop>
);
