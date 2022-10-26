using ContractdocIO.Application.Common.Interfaces;

namespace ContractdocIO.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
