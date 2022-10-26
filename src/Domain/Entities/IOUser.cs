using Microsoft.AspNetCore.Identity;

namespace ContactdocIO.Domain.Entities;

public class IOUser : IdentityUser
{
    public IList<Contact> Contacts = new List<Contact>();
}
