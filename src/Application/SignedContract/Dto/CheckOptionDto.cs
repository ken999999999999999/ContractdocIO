namespace ContractdocIO.Application.SignedContracts.Dto;
public class CheckOptionDto : IMapFrom<CheckOption>
{
    public int Id { get; set; }
    public string Content { get; set; } = default!;
    public bool IsRequired { get; set; } = false;
    public int Order { get; set; }
    public bool IsChecked { get; set; }
}
