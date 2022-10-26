using ContactdocIO.Application.Common.Dto;
namespace ContactdocIO.Application.Contacts.Dto;

public class ContactDto : BaseAuditableEntityDto, IMapFrom<Contact>
{
    public string Content { get; set; } = default!;

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public int Version { get; set; } = 1;

    public IList<OptionDto> Options = new List<OptionDto>();

}

