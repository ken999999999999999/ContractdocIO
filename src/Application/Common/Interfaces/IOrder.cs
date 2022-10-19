namespace ContactdocIO.Application.Common.Interfaces;

public interface IOrder
{
    public int PageNumber { get; init; }
    public int PageSize { get; init; } 
    public string OrderBy { get; init; }
    public bool IsOrderByAsc { get; init; }
}

