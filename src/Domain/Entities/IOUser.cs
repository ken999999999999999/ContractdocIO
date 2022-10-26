using Microsoft.AspNetCore.Identity;

namespace ContractdocIO.Domain.Entities;

public class IOUser : IdentityUser
{
    public IList<Contract> Contracts = new List<Contract>();
}
