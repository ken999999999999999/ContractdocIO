using ContactdocIO.Application.Common.Interfaces;

namespace ContactdocIO.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
