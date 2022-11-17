import {
  Card,
  AddButton,
  Loading,
  Stack,
  Checkbox,
  ResetButton,
  SubmitButton,
  IconButton
} from '@/lib';
import { useCreateContract } from '@/api/Contracts';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller
} from 'react-hook-form';
import { CreateContractCommand } from '@/api/web-api-client';
import { Typography, TextField, FormControlLabel } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
export default (): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CreateContractCommand>();
  const command = useCreateContract();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  });

  const onSubmit: SubmitHandler<CreateContractCommand> = (data) => {
    const newData: CreateContractCommand = {
      ...data,
      options: data.options?.map((option, index) => ({
        ...option,
        order: index
      }))
    };

    command.mutate(newData);
  };

  return (
    <Card title="Create your own contract">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column">
          <TextField
            label="Type"
            required
            {...register('type', {
              required: { value: true, message: 'Type is required' },
              maxLength: { value: 20, message: 'Max Length is 20' }
            })}
            error={!!errors?.type}
            helperText={errors?.type?.message ?? ''}
          />
          <TextField
            label="Title"
            required
            {...register('title', {
              required: { value: true, message: 'Title is required' },
              maxLength: { value: 20, message: 'Max Length is 20' }
            })}
            error={!!errors?.title}
            helperText={errors?.title?.message ?? ''}
          />
          <TextField
            label="Content"
            required
            {...register('content', {
              required: { value: true, message: 'Content is required' },
              maxLength: { value: 2000, message: 'Max Length is 2000' }
            })}
            multiline
            minRows={3}
            error={!!errors?.content}
            helperText={errors?.content?.message ?? ''}
          />

          {fields.map((field, index) => (
            <Stack alignItems="center" key={field.id}>
              <Typography>{`${index + 1}.`}</Typography>

              <TextField
                required
                label="Option Content"
                {...register(`options.${index}.content`, {
                  required: { value: true, message: 'Content is required' },
                  maxLength: { value: 20, message: 'Max Length is 20' }
                })}
                error={!!errors?.options?.[index]?.content}
                helperText={errors?.options?.[index]?.content?.message ?? ''}
              />
              <Controller
                name={`options.${index}.isRequired`}
                control={control}
                render={({ field: subField }) => (
                  <FormControlLabel
                    control={<Checkbox {...subField} />}
                    label="Required"
                  />
                )}
              />
              <IconButton
                onClick={() => remove(index)}
                children={<RemoveCircleOutlineIcon />}
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
