import { FormControlLabel, FormHelperText, Typography } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { CheckOptionDto } from '@/api/web-api-client';
import { Box, Button, Checkbox, Loading, SnackbarUtils, Stack } from '@/lib';
import { useCallback, useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateSignedContract } from '@/api/SignedContracts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SignatureCanvas from 'react-signature-canvas';
import { useNavigate } from 'react-router-dom';

interface ISignedContractSubmit {
  signedContractId: number;
  checkOptions?: CheckOptionDto[];
  refresh: () => void;
}

interface ISubmitForm {
  [key: string]: boolean;
}

export default ({
  signedContractId,
  checkOptions,
  refresh
}: ISignedContractSubmit): JSX.Element => {
  const signRef = useRef<SignatureCanvas | null>(null);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ISubmitForm>({
    criteriaMode: 'all'
  });

  const command = useUpdateSignedContract();

  const onSubmit: SubmitHandler<ISubmitForm> = useCallback(
    (options) => {
      if (signRef?.current?.isEmpty()) {
        SnackbarUtils.warning('Please sign the contract!');
        return;
      }
      const newOptionIds = Object.entries(options)
        .filter(([_, value]) => value)
        .map(([key]) => +key.replace('option', ''));

      command.mutate({
        id: signedContractId,
        checkOptionIds: newOptionIds,
        signature: signRef?.current?.toDataURL()
      });
    },
    [signedContractId, signRef]
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (command.isSuccess) {
      SnackbarUtils.success('Congratulations! Sign Successfully!');
      refresh();
      command.reset();
    }
  }, [command]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {checkOptions?.map((checkOption) => (
        <Controller
          name={`option${checkOption?.id ?? 0}`}
          control={control}
          rules={{
            required: checkOption.isRequired && 'This option must be checked!'
          }}
          render={({ field: subField }) => (
            <>
              <FormControlLabel
                control={<Checkbox checked={subField.value} {...subField} />}
                label={`${checkOption?.content ?? ''}${
                  checkOption.isRequired ? '*' : ''
                }`}
              />
              {errors[`option${checkOption?.id ?? 0}`] && (
                <FormHelperText error>
                  {errors[`option${checkOption?.id ?? 0}`]?.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      ))}
      <Box
        width={450}
        height={200}
        marginLeft="auto"
        marginRight="auto"
        marginBottom={3}
      >
        <Typography variant="overline">Signed here.</Typography>
        <SignatureCanvas
          canvasProps={{
            width: 450,
            height: 150,
            style: {
              border: '0.5px solid gray'
            }
          }}
          ref={signRef}
        />
        <Button
          color="error"
          onClick={() => signRef?.current?.clear()}
          fullWidth
        >
          Clear
        </Button>
      </Box>
      <Stack justifyContent="flex-end">
        <Button color="warning" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" endIcon={<ArrowForwardIosIcon />}>
          Submit
        </Button>
      </Stack>
      <Loading loading={command.isLoading} />
    </form>
  );
};
