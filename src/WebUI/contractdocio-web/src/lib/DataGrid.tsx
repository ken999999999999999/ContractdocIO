import { DataGrid, DataGridProps, GridSortModel } from '@mui/x-data-grid';

interface IDataGrid extends Omit<DataGridProps, 'rows'> {
  data?: {
    items?: any[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
  };
  params: IOrder;
  initialParams: IOrder;
  onParamsChange: (args: {
    pageSize?: number;
    pageNumber?: number;
    orderBy?: string | null;
    isOrderByAsc?: boolean;
  }) => void;
}

export default ({
  data,
  params,
  initialParams,
  onParamsChange,
  ...rest
}: IDataGrid): JSX.Element => {
  const onSortModelChange = (model: GridSortModel) =>
    onParamsChange({
      orderBy: model?.length
        ? model?.[0].field.charAt(0).toUpperCase() + model?.[0].field?.slice(1)
        : initialParams.orderBy,
      isOrderByAsc: model?.length
        ? model?.[0]?.sort === 'asc'
        : initialParams.isOrderByAsc
    });

  const onPageChange = (pageNumber: number) => onParamsChange({ pageNumber });

  const onPageSizeChange = (pageSize: number) => onParamsChange({ pageSize });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        page={data?.pageNumber}
        pageSize={params.pageSize}
        rows={data?.items ?? []}
        rowCount={data?.totalCount ?? 0}
        rowsPerPageOptions={[5, 10, 20, 50]}
        disableColumnMenu
        sortingMode="server"
        paginationMode="server"
        onSortModelChange={onSortModelChange}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        {...rest}
      />
    </div>
  );
};
