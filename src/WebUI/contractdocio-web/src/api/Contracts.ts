import { ContractsClient, CreateContractCommand } from './web-api-client';
import { useMutation, useQuery } from '@tanstack/react-query';

const client = new ContractsClient(window.location.origin);

export const useGetContractsWithPagination = (args: IOrder) =>
  useQuery(['contract', 'getWithPagination', args], () =>
    client.getWithPagination(
      args.pageNumber,
      args.pageSize,
      args.orderBy,
      args.isOrderByAsc
    )
  );

export const useCreateContract = () => {
  return useMutation({
    mutationKey: ['contract', 'create'],
    mutationFn: (command: CreateContractCommand) => client.create(command)
  });
};
