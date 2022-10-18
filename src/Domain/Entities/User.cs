using System;
using System.ComponentModel.DataAnnotations;

namespace ContactdocIO.Domain.Entities;

public class User
{

    public string Id { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string Email { get; set; } = default!;

    public IList<Contact> Contacts = new List<Contact>();

}

