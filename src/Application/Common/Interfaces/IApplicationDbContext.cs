using ContractdocIO.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContractdocIO.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Contract> Contracts { get; }

    DbSet<Option> Options { get; }

    DbSet<IOUser> IOUsers { get;}

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
