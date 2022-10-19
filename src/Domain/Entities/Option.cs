namespace ContactdocIO.Domain.Entities;

public class Option : BaseEntity
{
    public int ContactId { get; set; }

    public Contact Contact { get; set; } = null!;

    public string Content { get; set; } = default!;

    public bool IsRequired { get; set; } = false;

    public int Order { get; set; }
}

