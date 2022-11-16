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
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'version', headerName: 'Version', width: 130 }
];

export default (): JSX.Element => {
  const [params, setParams] = useState<IOrder>(initParams);

  const { isLoading, data } = useGetContractsWithPagination(params);

  return (
    <Card title="Received Contracts">
      <DataGrid
        loading={isLoading}
        data={data}
        columns={columns}
        pageSize={params?.pageSize}
      />
    </Card>
  );
};
