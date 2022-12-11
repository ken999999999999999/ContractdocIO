import { Card, DataGrid, ViewButton } from '@/lib';
import { useState } from 'react';
import {
  useGetSignedContractsWithPagination,
  IGetSignedContractsWithPagination
} from '@/api/SignedContracts';
import { SignedContractBriefDto } from '@/api/web-api-client';
import { GridColDef } from '@mui/x-data-grid';

const initParams: IGetSignedContractsWithPagination = {
  isSentFromMySelf: false,
  isSigned: null,
  pageNumber: 1,
  pageSize: 10,
  orderBy: 'Created',
  isOrderByAsc: false
};

const columns: GridColDef<SignedContractBriefDto, any>[] = [
  { field: 'type', headerName: 'Type' },
  { field: 'title', headerName: 'Title' },

  { field: 'sent', headerName: 'Sent', type: 'dateTime' },
  {
    field: 'contractOwnedByUser',
    headerName: `Sender's Email`,
    renderCell: ({ row }) => row?.contractOwnedByUser?.email
  },
  {
    field: 'signed',
    headerName: 'Signed',
    type: 'dateTime'
  },
  {
    field: 'id',
    headerName: 'Action',
    renderCell: ({ id }) => <ViewButton to={`/signed-contracts/${id}`} />
  }
];

export default (): JSX.Element => {
  const [params, setParams] =
    useState<IGetSignedContractsWithPagination>(initParams);

  const { isLoading, data } = useGetSignedContractsWithPagination(params);

  return (
    <Card header="Received Contracts">
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
