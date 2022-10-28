import { ContractsClient } from './web-api-client';
import { useQuery } from '@tanstack/react-query';

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
