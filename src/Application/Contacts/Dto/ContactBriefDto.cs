using ContactdocIO.Application.Common.Dto;
namespace ContactdocIO.Application.Contacts.Dto;

public class ContactBriefDto : BaseAuditableEntityDto, IMapFrom<Contact>
{

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public int Version { get; set; } = 1;
}

