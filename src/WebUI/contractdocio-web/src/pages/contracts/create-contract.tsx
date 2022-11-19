import {
  Card,
  Loading,
  Stack,
  Steps,
  Button,
  SuccessResult,
  AddButton
} from '@/lib';
import { useCreateContract } from '@/api/Contracts';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateContractCommand } from '@/api/web-api-client';
import { ContractForm, ContractPreview } from '@/components/Contracts';
import { useCallback, useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UndoIcon from '@mui/icons-material/Undo';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: 'Create your contract',
    key: 'create'
  },
  {
    title: 'Preview',
    key: 'preview'
  },
  {
    title: 'Finish',
    key: 'success'
  }
];

export default (): JSX.Element => {
  const { register, handleSubmit, control, formState, watch } =
    useForm<CreateContractCommand>({ criteriaMode: 'all' });

  const command = useCreateContract();

  const [currentStep, setCurrentStep] = useState<
    'create' | 'preview' | 'success'
  >('create');

  const onSubmit: SubmitHandler<CreateContractCommand> = useCallback(
    (data) => {
      switch (currentStep) {
        case 'create':
          setCurrentStep('preview');
          return;
        case 'preview': {
          command.mutate({
            ...data,
            options: data.options?.map((option, index) => ({
              ...option,
              order: index
            }))
          });
          return;
        }
        default:
          return;
      }
    },
    [command, currentStep]
  );

  const formValue = watch();

  useEffect(() => {
    if (command.isSuccess) setCurrentStep('success');
  }, [command]);

  const content = {
    create: (
      <ContractForm
        register={register}
        control={control}
        formState={formState}
      />
    ),
    preview: <ContractPreview {...formValue} />,
    success: (
      <SuccessResult
        title="Successfully created contract"
        description="Now you can send the contract to others."
        actions={[
          <AddButton onClick={() => location.reload()}>Create again</AddButton>,
          <Link to="/built-contracts/">
            <Button variant="contained" startIcon={<UndoIcon />}>
              Go Back
            </Button>
          </Link>
        ]}
      />
    )
  };

  return (
    <Card title="Create your own contract">
      <Steps steps={steps} currentStep={currentStep} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {content[currentStep]}
        <Stack justifyContent="flex-end" marginTop={3}>
          {currentStep === 'preview' && (
            <Button
              color="secondary"
              startIcon={<ArrowBackIosIcon />}
              onClick={() => setCurrentStep('create')}
            >
              Previous
            </Button>
          )}
          {currentStep !== 'success' && (
            <Button type="submit" endIcon={<ArrowForwardIosIcon />}>
              {currentStep === 'create' ? 'Next' : 'Confirm'}
            </Button>
          )}
        </Stack>
      </form>

      <Loading loading={command.isLoading} />
    </Card>
  );
};
