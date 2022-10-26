using ContractdocIO.Application.Common.Dto;
namespace ContractdocIO.Application.Contracts.Dto;

public class ContractDto : BaseAuditableEntityDto, IMapFrom<Contract>
{
    public string Content { get; set; } = default!;

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public int Version { get; set; } = 1;

    public IList<OptionDto> Options = new List<OptionDto>();

}

