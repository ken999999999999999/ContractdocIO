interface IOrder {
  pageNumber: number | undefined;
  pageSize: number | undefined;
  orderBy: string | null | undefined;
  isOrderByAsc: boolean | undefined;
}
