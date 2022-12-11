import { useGetContractById } from '@/api/Contracts';
import { ContractPreview } from '@/components/Contracts';
import { Card } from '@/lib';
import { useParams } from 'react-router-dom';

export default () => {
  const { signedContractId } = useParams();
  const { isLoading, data: contract } = useGetContractById(signedContractId);
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
      loading={isLoading}
    >
      <ContractPreview {...contract} />
    </Card>
  );
};
