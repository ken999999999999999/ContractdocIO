import { DataGrid, DataGridProps } from '@mui/x-data-grid';

interface IDataGrid extends DataGridProps {
  pageMeta: {
    pageNumber?: number;
    pageSize?: number;
    totalCount?: number;
  };
}

export default ({ pageMeta, ...rest }: IDataGrid): JSX.Element => {
  return (
    <DataGrid
      page={pageMeta.pageNumber}
      pageSize={pageMeta.pageSize}
      rowCount={pageMeta.totalCount}
      {...rest}
    />
  );
};
