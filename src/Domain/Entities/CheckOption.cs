namespace ContractdocIO.Domain.Entities;
public class CheckOption : BaseEntity
{
    public int OptionId { get; set; }
    public Option Option { get; set; }
    public int SignedContractId { get; set; }
    public SignedContract SignedContract { get; set; }
    public string Content { get; set; } = default!;
    public bool IsRequired { get; set; } = false;
    public int Order { get; set; }
    public bool IsChecked { get; set; }



}
