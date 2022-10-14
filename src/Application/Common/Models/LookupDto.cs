using ContactdocIO.Application.Common.Mappings;
using ContactdocIO.Domain.Entities;

namespace ContactdocIO.Application.Common.Models;

// Note: This is currently just used to demonstrate applying multiple IMapFrom attributes.
public class LookupDto : IMapFrom<TodoList>, IMapFrom<TodoItem>
{
    public int Id { get; set; }

    public string? Title { get; set; }
}
