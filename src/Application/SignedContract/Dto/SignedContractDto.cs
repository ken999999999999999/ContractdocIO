namespace ContractdocIO.Application.SignedContracts.Dto;
public class SignedContractDto : BaseAuditableEntityDto, IMapFrom<SignedContract>
{
    public string Type { get; set; } = default!;
    public string Title { get; set; } = default!;
    public string Content { get; set; } = default!;
    public string ReceivedByEmail { get; set; } = default!;
    public string? Signature { get; set; }
    public DateTime? Signed { get; set; }
    public DateTime Sent { get; set; }

    public IOUserDto ContractOwnedByUser { get; set; }

    public IList<CheckOptionDto> CheckOptions { get; set; } = new List<CheckOptionDto>();
}
