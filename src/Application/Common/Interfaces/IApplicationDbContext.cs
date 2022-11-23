namespace ContractdocIO.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Contract> Contracts { get; }

    DbSet<Option> Options { get; }

    DbSet<IOUser> IOUsers { get;}
    DbSet<CheckOption> CheckOptions { get; }

    DbSet<SignedContract> SignedContracts { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
