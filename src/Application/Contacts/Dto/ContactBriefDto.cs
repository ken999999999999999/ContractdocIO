using ContactdocIO.Application.Common.Mappings;
using ContactdocIO.Domain.Common;
using ContactdocIO.Domain.Entities;

namespace ContactdocIO.Application.Contacts.Dto;

public class ContactBriefDto: BaseAuditableEntity , IMapFrom<Contact>
{

}

