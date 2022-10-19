﻿namespace ContactdocIO.Application.Contacts.Dto;

public class ContactBriefDto : BaseAuditableEntity, IMapFrom<Contact>
{

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public int Version { get; set; } = 1;
}

