import { Card, Stack, Steps, Button, SuccessResult, AddButton } from '@/lib';
import { useCreateContract, useGetContractById } from '@/api/Contracts';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateContractCommand } from '@/api/web-api-client';
import { ContractForm, ContractPreview } from '@/components/Contracts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UndoIcon from '@mui/icons-material/Undo';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default (): JSX.Element => {
  const { search } = useLocation();

  const navigate = useNavigate();

  const parentContractId = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get('parentContractId');
  }, [search]);

  const steps = useMemo(
    () => [
      {
        title: `${!parentContractId ? 'Create' : 'Edit'} your contract`,
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
    ],
    [parentContractId]
  );

  const { isLoading: isFetching, data: parentContract } =
    useGetContractById(parentContractId);

  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm<CreateContractCommand>({
      criteriaMode: 'all'
    });

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
        title={`Successfully ${
          !parentContractId ? 'created' : 'edited'
        } contract`}
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

  useEffect(() => {
    if (command.isSuccess) setCurrentStep('success');
  }, [command]);

  useEffect(() => {
    if (parentContract) {
      setValue('parentContractId', parentContract?.id);
      setValue('title', parentContract?.title);
      setValue('type', parentContract?.type);
      setValue('content', parentContract?.content);
      setValue('options', parentContract?.options);
    }
  }, [parentContract]);

  return (
    <Card
      header={
        !parentContractId
          ? 'Create your own contract'
          : `Edit ${parentContract?.type ?? ''} - ${
              parentContract?.title ?? ''
            } (Version: ${parentContract?.version ?? ''})`
      }
      loading={command.isLoading || (isFetching && !!parentContractId)}
    >
      <Steps steps={steps} currentStep={currentStep} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {content[currentStep]}
        <Stack justifyContent="flex-end" marginTop={3}>
          {currentStep !== 'success' && (
            <Button color="warning" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          )}
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
    </Card>
  );
};
