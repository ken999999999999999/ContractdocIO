import {
  Card,
  AddButton,
  Loading,
  Stack,
  Checkbox,
  ResetButton,
  SubmitButton
} from '@/lib';
import { useCreateContract } from '@/api/Contracts';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller
} from 'react-hook-form';
import { CreateContractCommand } from '@/api/web-api-client';
import SnackbarUtils from '@/lib/SnackbarUtils';
import { Typography, TextField } from '@mui/material';

export default (): JSX.Element => {
  const { register, handleSubmit, control } = useForm<CreateContractCommand>();
  const command = useCreateContract();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'options'
    }
  );

  const onSubmit: SubmitHandler<CreateContractCommand> = (data) => {
    const newData: CreateContractCommand = {
      ...data,
      options: data.options?.map((option, index) => ({
        ...option,
        order: index
      }))
    };
    SnackbarUtils.info(JSON.stringify(newData));
    //command.mutate(newData);
  };

  return (
    <Card title="Create your own contract">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column">
          <Controller
            name="type"
            rules={{
              required: { value: true, message: 'Please fill in "Type"' }
            }}
            control={control}
            render={({ field, fieldState, formState }) => {
              console.log(fieldState, formState);
              return (
                <TextField
                  required
                  label="Type"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              );
            }}
          />

          <Controller
            name="title"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField required label="Title" {...field} />
            )}
          />
          <Controller
            name="content"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField required label="Content" {...field} />
            )}
          />

          {fields.map((field, index) => (
            <Stack alignItems="flex-end" key={field.id}>
              <Typography>{`${index + 1}.`}</Typography>
              <Controller
                name={`options.${index}.content`}
                rules={{ required: true }}
                control={control}
                render={({ field: subField }) => (
                  <TextField required label="Option Content" {...subField} />
                )}
              />
              <Controller
                name={`options.${index}.isRequired`}
                control={control}
                render={({ field: subField }) => <Checkbox {...subField} />}
              />
            </Stack>
          ))}
          <AddButton onClick={() => append({ content: '' })}>Option</AddButton>
          <Stack justifyContent="flex-end" alignItems="flex-end">
            <ResetButton>Reset</ResetButton>
            <SubmitButton>Submit</SubmitButton>
          </Stack>
        </Stack>
      </form>

      <Loading loading={command.isLoading} />
    </Card>
  );
};
