import { useCreateSignedContract } from '@/api/SignedContracts';
import { CreateSignedContractCommand } from '@/api/web-api-client';
import { FormDialog } from '@/lib';
import { DialogContentText, TextField } from '@mui/material';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface ISendContractDialogRef {
  open: () => void;
}

interface ISendContractDialog {
  contractId: number;
}

export default forwardRef<ISendContractDialogRef, ISendContractDialog>(
  ({ contractId }, ref): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const {
      reset,
      handleSubmit,
      register,
      formState: { errors }
    } = useForm<CreateSignedContractCommand>({
      criteriaMode: 'all'
    });

    const command = useCreateSignedContract();

    const onSubmit: SubmitHandler<CreateSignedContractCommand> = useCallback(
      (value) => command.mutate({ email: value.email, contractId }),
      [contractId]
    );

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true)
    }));

    useEffect(() => {
      if (!open) reset();
    }, [open]);

    return (
      <FormDialog
        title="Send Contract"
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
        loading={command.isLoading}
      >
        <DialogContentText>
          To send this contract to others, please enter receiver's email address
          here. We will send notification occasionally.
        </DialogContentText>
        <TextField
          fullWidth
          title="Receiver's Email"
          {...register('email', {
            required: { value: true, message: 'Email is required' },
            validate: (value) => value?.includes('@') || 'Invalid Email'
          })}
          error={!!errors?.email}
          helperText={errors?.email?.message ?? ''}
        />
      </FormDialog>
    );
  }
);
