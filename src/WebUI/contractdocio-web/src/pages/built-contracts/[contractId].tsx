import { useGetContractById } from '@/api/Contracts';
import { ContractPreview, SendContractButton } from '@/components/Contracts';
import { Card, Stack, EditButton } from '@/lib';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default () => {
  const { contractId } = useParams();
  const { isLoading, data: contract } = useGetContractById(contractId);
  return (
    <Card
      header={
        contract ? (
          <>
            <strong>{`${contract?.type ?? ''}`}</strong>&nbsp;-&nbsp;
            {`${contract?.title ?? ''} (Version:${contract?.version ?? ''})`}
          </>
        ) : (
          ''
        )
      }
      action={
        <Stack>
          <Link
            to={`/contracts/create-contract?parentContractId=${
              contractId ?? ''
            }`}
          >
            <EditButton>Edit</EditButton>
          </Link>
          <SendContractButton contractId={+(contractId ?? '')} />
        </Stack>
      }
      loading={isLoading}
    >
      <ContractPreview {...contract} />
    </Card>
  );
};
