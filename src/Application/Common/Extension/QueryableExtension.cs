using System.Linq.Expressions;

namespace ContractdocIO.Application.Common.Extension;

public static class QueryableExtension
{
    public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, bool>> predicate)
    {
        return condition ? query.Where(predicate) : query;
    }

    public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, int, bool>> predicate)
    {
        return condition ? query.Where(predicate) : query;
    }

    public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string Property, bool IsAsc)
    {
        var expression = source.Expression;

        var parameter = Expression.Parameter(typeof(T), "x");
        Expression selector = parameter;
        foreach (var member in Property.Split('.'))
        {
            selector = Expression.PropertyOrField(selector, member);
        }
        var method = IsAsc ? "OrderBy" : "OrderByDescending";

        expression = Expression.Call(
            typeof(Queryable),
            method,
            new Type[] { source.ElementType, selector.Type },
            expression,
            Expression.Quote(Expression.Lambda(selector, parameter)));

        return source.Provider.CreateQuery<T>(expression);
    }
}

