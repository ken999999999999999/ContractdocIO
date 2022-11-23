namespace ContractdocIO.Application.SignedContracts.Dto;
public class SignedContractBriefDto : BaseAuditableEntityDto, IMapFrom<SignedContract>
{
    public string Type { get; set; } = default!;
    public string Title { get; set; } = default!;
    public DateTime? Signed { get; set; }
    public DateTime Sent { get; set; }

    public IOUserDto ContractOwnedByUser;
}
