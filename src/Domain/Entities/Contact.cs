namespace ContactdocIO.Domain.Entities;

public class Contact : BaseAuditableEntity
{
    public string ContactGroupId { get; set; } = default!;

    public string Content { get; set; } = default!;

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public int Version { get; set; } = 1;

    public IList<Option> Options = new List<Option>();

    public string OwnedByUserId = default!;

    public User OwnedByUser = null!;
}

