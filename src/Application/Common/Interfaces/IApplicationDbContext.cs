using ContactdocIO.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactdocIO.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Contact> Contacts { get; }

    DbSet<Option> Options { get; }

    DbSet<IOUser> IOUsers { get;}

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
