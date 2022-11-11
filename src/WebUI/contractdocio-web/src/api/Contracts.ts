import { ContractsClient, CreateContractCommand } from './web-api-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const client = new ContractsClient(window.location.origin);

export const useGetContractsWithPagination = (args: IOrder) =>
  useQuery(['contract', 'getWithPagination'], () =>
    client.getWithPagination(
      args.pageNumber,
      args.pageSize,
      args.orderBy,
      args.isOrderByAsc
    )
  );

export const useCreateContract = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['contract', 'create'],
    mutationFn: (command: CreateContractCommand) => client.create(command),
    onSuccess: (data) => navigate(`/contracts/${data}`)
  });
};
