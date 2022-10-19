namespace ContactdocIO.Application.Contacts.Commands.CreateContact;

public class OptionInputDto
{
    public string Content { get; set; } = default!;

    public bool IsRequired { get; set; } = false;

    public int Order { get; set; }

}

