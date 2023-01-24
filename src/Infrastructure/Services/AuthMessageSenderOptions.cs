namespace ContractdocIO.Infrastructure.Services;

public class AuthMessageSenderOptions
{
    public const string AuthMessageSender = "AuthMessageSender";
    public string? SendGridKey { get; set; }
    public string? Email { get; set; }
    public string? Name { get; set; }
}

