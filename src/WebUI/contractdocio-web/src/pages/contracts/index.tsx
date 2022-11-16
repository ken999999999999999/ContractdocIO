import { AddButton, Card, DataGrid } from '@/lib';
import { useGetContractsWithPagination } from '@/api/Contracts';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <Card
      title="Built Contracts"
      action={
        <Link to="/contracts/create-contract">
          <AddButton>Create New Contract</AddButton>
        </Link>
      }
    >
      <DataGrid
        loading={isLoading}
        data={data}
        pageSize={params.pageSize}
        columns={columns}
      />
    </Card>
  );
};
