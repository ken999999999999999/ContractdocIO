import { AddButton, Card, DataGrid, ViewButton } from '@/lib';
import { useGetContractsWithPagination } from '@/api/Contracts';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContractBriefDto } from '@/api/web-api-client';
import { GridColDef } from '@mui/x-data-grid';

const initParams: IOrder = {
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'Created',
  isOrderByAsc: false
};

const columns: GridColDef<ContractBriefDto>[] = [
  { field: 'type', headerName: 'Type' },
  { field: 'title', headerName: 'Title' },
  { field: 'version', headerName: 'Version' },
  {
    field: 'id',
    headerName: 'Action',
    renderCell: ({ id }) => <ViewButton to={`/contract/${id ?? ''}`} />
  }
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
        params={params}
        initialParams={initParams}
        onParamsChange={(value) =>
          setParams((oldParams) => ({ ...oldParams, ...value }))
        }
        columns={columns}
        pageSize={params?.pageSize}
      />
    </Card>
  );
};
