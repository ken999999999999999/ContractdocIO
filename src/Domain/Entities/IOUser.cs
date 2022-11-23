using Microsoft.AspNetCore.Identity;

namespace ContractdocIO.Domain.Entities;

public class IOUser : IdentityUser
{
    public IList<Contract> Contracts { get; set; } = new List<Contract>();
    public IList<SignedContract> SignedContracts { get; set; } = new List<SignedContract>();
}
