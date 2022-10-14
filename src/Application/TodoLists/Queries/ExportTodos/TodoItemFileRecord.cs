using ContactdocIO.Application.Common.Mappings;
using ContactdocIO.Domain.Entities;

namespace ContactdocIO.Application.TodoLists.Queries.ExportTodos;

public class TodoItemRecord : IMapFrom<TodoItem>
{
    public string? Title { get; set; }

    public bool Done { get; set; }
}
