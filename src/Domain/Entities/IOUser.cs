namespace ContactdocIO.Domain.Entities;

public class IOUser
{

    public string Id { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string LoginId { get; set; } = default!;

    public string Email { get; set; } = default!;

    public IList<Contact> Contacts = new List<Contact>();

    public DateTime Created { get; set; } = DateTime.Now;

}

