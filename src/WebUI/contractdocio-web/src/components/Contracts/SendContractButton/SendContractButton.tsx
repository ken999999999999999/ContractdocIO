import { SubmitButton } from '@/lib';
import { useRef } from 'react';
import SendContractDialog, {
  ISendContractDialogRef
} from './SendContractDialog';

interface ISendContractButton {
  contractId: number;
}

export default ({ contractId }: ISendContractButton) => {
  const sendContractDialogRef = useRef<ISendContractDialogRef | null>(null);

  return (
    <>
      <SubmitButton onClick={() => sendContractDialogRef?.current?.open()}>
        Send
      </SubmitButton>
      <SendContractDialog ref={sendContractDialogRef} contractId={contractId} />
    </>
  );
};
