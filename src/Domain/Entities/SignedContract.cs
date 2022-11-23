namespace ContractdocIO.Domain.Entities;

public class SignedContract : BaseAuditableEntity
{
    public int ContractId { get; set; }
    public Contract Contract { get; set; }
    public string ReferenceCode { get; set; } = default!;
    public string Content { get; set; } = default!;
    public string Type { get; set; } = default!;
    public string Title { get; set; } = default!;
    public string ReceivedByEmail { get; set; } = default!;
    public string? ReceivedByUserId { get; set; }
    public IOUser ReceivedByUser { get; set; }
    public string? Signature { get; set; }
    public DateTime? Signed { get; set; }
    public DateTime Sent { get; private set; } = DateTime.UtcNow;
    public IList<CheckOption> CheckOptions { get; set; } = new List<CheckOption>();

}

