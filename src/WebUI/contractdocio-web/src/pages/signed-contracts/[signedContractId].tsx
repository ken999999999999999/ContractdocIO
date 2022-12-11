import { useGetSignedContractById } from '@/api/SignedContracts';
import { SignedContractContent } from '@/components/SignedContracts';
import { Box, Card } from '@/lib';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { signedContractId } = useParams();
  const { isLoading, data: signedContract } =
    useGetSignedContractById(signedContractId);

  const signable = useMemo(() => !signedContract?.signed, [signedContract]);

  return (
    <Card
      header={
        signedContract ? (
          <>
            <strong>{`${signedContract?.type ?? ''}`}</strong>&nbsp;-&nbsp;
            {signedContract?.title ?? ''}
          </>
        ) : (
          ''
        )
      }
      loading={isLoading}
    >
      <Box
        border="1px solid"
        p={2}
        maxWidth={1200}
        marginLeft="auto"
        marginRight="auto"
      >
        <SignedContractContent
          showSignature={signable}
          fromEmail={signedContract?.contractOwnedByUser?.email ?? ''}
          toEmail={signedContract?.receivedByEmail ?? ''}
          {...signedContract}
        />
      </Box>
    </Card>
  );
};
