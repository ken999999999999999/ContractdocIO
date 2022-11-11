import { Card, DataGrid } from '@/lib';
import { useGetContractsWithPagination } from '@/api/Contracts';
import { useState } from 'react';

const initParams: IOrder = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'created',
  isOrderByAsc: false
};

const columns = [
  { field: 'type', headerName: 'Type' },
  { field: 'title', headerName: 'Title' },
  { field: 'version', headerName: 'Version' }
];

export default (): JSX.Element => {
  const [params, setParams] = useState<IOrder>(initParams);

  const { isLoading, data } = useGetContractsWithPagination(params);

  return (
    <Card title="Received Contracts">
      <DataGrid
        loading={isLoading}
        pageMeta={{
          pageNumber: data?.pageNumber,
          pageSize: params?.pageSize,
          totalCount: data?.totalCount
        }}
        rows={data?.items ?? []}
        columns={columns}
      />
    </Card>
  );
};
