import { Stack, Checkbox, IconButton, RichTextEditor, AddButton } from '@/lib';

import {
  Control,
  Controller,
  FormState,
  useFieldArray,
  UseFormRegister
} from 'react-hook-form';
import { Typography, TextField, FormControlLabel } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CreateContractCommand } from '@/api/web-api-client';

interface IContractForm {
  register: UseFormRegister<CreateContractCommand>;
  formState: FormState<CreateContractCommand>;
  control: Control<CreateContractCommand, any>;
}

export default ({
  register,
  control,
  formState
}: IContractForm): JSX.Element => {
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  });

  return (
    <Stack direction="column">
      <TextField
        label="Type*"
        {...register('type', {
          required: { value: true, message: 'Type is required' },
          maxLength: { value: 20, message: 'Max Length is 20' }
        })}
        error={!!errors?.type}
        helperText={errors?.type?.message ?? ''}
      />

      <TextField
        label="Title*"
        {...register('title', {
          required: { value: true, message: 'Title is required' },
          maxLength: { value: 20, message: 'Max Length is 20' }
        })}
        error={!!errors?.title}
        helperText={errors?.title?.message ?? ''}
      />
      <RichTextEditor
        formProps={{
          control: control,
          name: 'content',
          rules: {
            required: { value: true, message: 'Content is required' },
            maxLength: { value: 2000, message: 'Max Length is 2000' }
          }
        }}
        placeholder="Please draft your contract content here."
      />

      {fields.map((field, index) => (
        <Stack alignItems="center" key={field.id}>
          <Typography>{`${index + 1}.`}</Typography>

          <TextField
            label="Option Content*"
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
    </Stack>
  );
};
