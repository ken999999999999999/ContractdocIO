namespace ContractdocIO.Application.Contracts.Dto;

public class ContractBriefDto : BaseAuditableEntityDto, IMapFrom<Contract>
{
    public string Type { get; set; } = default!;
    public string Title { get; set; } = default!;
    public int Version { get; set; } = 1;
    public bool IsCurrent { get; set; }
}

