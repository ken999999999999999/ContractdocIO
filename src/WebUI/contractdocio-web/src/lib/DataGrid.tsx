import { DataGrid, DataGridProps, GridSortModel } from '@mui/x-data-grid';
import { useCallback, useMemo } from 'react';

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
  columns,
  initialParams,
  onParamsChange,
  ...rest
}: IDataGrid): JSX.Element => {
  const onSortModelChange = useCallback(
    (model: GridSortModel) =>
      onParamsChange({
        orderBy: model?.length
          ? model?.[0].field.charAt(0).toUpperCase() +
            model?.[0].field?.slice(1)
          : initialParams.orderBy,
        isOrderByAsc: model?.length
          ? model?.[0]?.sort === 'asc'
          : initialParams.isOrderByAsc
      }),
    [onParamsChange]
  );

  const onPageChange = useCallback(
    (pageNumber: number) => onParamsChange({ pageNumber: pageNumber + 1 }),
    [onParamsChange]
  );

  const onPageSizeChange = useCallback(
    (pageSize: number) => onParamsChange({ pageSize }),
    [onParamsChange]
  );

  const formattedColumns = useMemo(
    () => columns.map((column) => ({ flex: 1, ...column })),
    [columns]
  );

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        page={data?.pageNumber ? data.pageNumber - 1 : 0}
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
        columns={formattedColumns}
        {...rest}
      />
    </div>
  );
};
