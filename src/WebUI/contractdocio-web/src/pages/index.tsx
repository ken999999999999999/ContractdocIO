import { Card, DataGrid } from '@/lib';
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

const columns: GridColDef<any, SignedContractBriefDto>[] = [
  { field: 'type', headerName: 'Type' },
  { field: 'title', headerName: 'Title' },
  { field: 'signed', headerName: 'Signed' },
  { field: 'sent', headerName: 'Sent' },
  {
    field: 'contractOwnedByUser',
    headerName: `Sender's Email`,
    renderCell: ({ value }) => value?.contractOwnedByUser?.email ?? ''
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
