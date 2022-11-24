namespace ContractdocIO.Domain.Entities;

public class Contract : BaseAuditableEntity
{
    public string ContractGroupId { get; set; } = default!;

    public string Content { get; set; } = default!;

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public int Version { get; set; } = 1;
    public IList<Option> Options { get; set; } = new List<Option>();
    public string OwnedByUserId { get; set; } = default!;
    public IOUser OwnedByUser { get; set; } = null!;


    public SignedContract Send(string email, string? receivedByUserId) => new SignedContract
    {
        ContractId = Id,
        ReferenceCode = Guid.NewGuid().ToString(),
        Content = Content,
        Type = Type,
        Title = Title,
        ReceivedByEmail = email,
        ReceivedByUserId = receivedByUserId,
        CheckOptions = Options.Select(option => option.ToCheckOption()).ToList(),
    };

}

