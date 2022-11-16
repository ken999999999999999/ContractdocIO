import { DataGrid, DataGridProps } from '@mui/x-data-grid';

interface IDataGrid extends Omit<DataGridProps, 'rows'> {
  data?: {
    items?: any[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
  };
  pageSize?: number;
}

export default ({ data, pageSize, ...rest }: IDataGrid): JSX.Element => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        page={data?.pageNumber}
        pageSize={pageSize}
        rowCount={data?.totalCount}
        rows={data?.items ?? []}
        rowsPerPageOptions={[5, 10, 20, 50]}
        {...rest}
      />
    </div>
  );
};
