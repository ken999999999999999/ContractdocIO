namespace ContractdocIO.Application.Contracts.Dto;

public class ContractDto : BaseAuditableEntityDto, IMapFrom<Contract>
{
    public string Content { get; set; } = default!;

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public int Version { get; set; } = 1;

    public IList<OptionDto> Options { get; set; } = new List<OptionDto>();

}

