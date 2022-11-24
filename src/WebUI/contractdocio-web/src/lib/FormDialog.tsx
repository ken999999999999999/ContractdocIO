import MuiDialog, { DialogProps } from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Button from './Buttons/Button';
import Loading from './Loading';

interface IDialog extends DialogProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitText?: string;
  title: string;
  loading: boolean;
}

export default ({
  loading,
  title,
  onCancel,
  onSubmit,
  submitText,
  children,
  ...rest
}: IDialog): JSX.Element => (
  <MuiDialog {...rest}>
    <MuiDialogTitle>
      <strong>{title}</strong>
    </MuiDialogTitle>
    <form onSubmit={onSubmit}>
      <MuiDialogContent>{children}</MuiDialogContent>
      <MuiDialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" type="submit">
          {submitText ?? 'Submit'}
        </Button>
      </MuiDialogActions>
    </form>
    <Loading loading={loading} />
  </MuiDialog>
);
