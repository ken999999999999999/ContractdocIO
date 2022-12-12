import { useGetSignedContractById } from '@/api/SignedContracts';
import {
  SignedContractContent,
  SignedContractSubmit
} from '@/components/SignedContracts';
import { Box, Card } from '@/lib';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

export default () => {
  const { signedContractId } = useParams();
  const {
    isLoading,
    data: signedContract,
    refetch
  } = useGetSignedContractById(signedContractId);

  const auth = useAuth();

  const signable = useMemo(
    () =>
      !signedContract?.signed &&
      auth?.user?.profile.sub === signedContract?.receivedByUserId,
    [signedContract, auth]
  );

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
          showSignature={!signable}
          fromEmail={signedContract?.contractOwnedByUser?.email ?? ''}
          toEmail={signedContract?.receivedByEmail ?? ''}
          {...signedContract}
        />

        {signable && (
          <SignedContractSubmit
            signedContractId={+(signedContractId ?? 0)}
            checkOptions={signedContract?.checkOptions}
            refresh={refetch}
          />
        )}
      </Box>
    </Card>
  );
};
