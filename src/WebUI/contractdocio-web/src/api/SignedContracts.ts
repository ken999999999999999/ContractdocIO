import {
  CreateSignedContractCommand,
  SignedContractsClient
} from './web-api-client';
import { useMutation, useQuery } from '@tanstack/react-query';

const client = new SignedContractsClient(window.location.origin);

export interface IGetSignedContractsWithPagination extends IOrder {
  isSentFromMySelf: boolean | undefined;
  isSigned: boolean | null | undefined;
}

export const useGetSignedContractsWithPagination = (
  args: IGetSignedContractsWithPagination
) =>
  useQuery(['signedContract', 'getWithPagination', args], () =>
    client.getWithPagination(
      args.isSentFromMySelf,
      args.isSigned,
      args.pageNumber,
      args.pageSize,
      args.orderBy,
      args.isOrderByAsc
    )
  );

export const useCreateSignedContract = () =>
  useMutation({
    mutationKey: ['contract', 'create'],
    mutationFn: (command: CreateSignedContractCommand) => client.create(command)
  });
