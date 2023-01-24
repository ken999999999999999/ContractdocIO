using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace ContractdocIO.Infrastructure.Services;

public class EmailSender:IEmailSender
{private readonly ILogger _logger;

    public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor, ILogger<EmailSender> logger)
    {
        Options = optionsAccessor.Value;
        _logger = logger;
    }

    public AuthMessageSenderOptions Options { get; } //Set with Secret Manager.

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        if (string.IsNullOrEmpty(Options.SendGridKey))
        {
            throw new Exception("Null SendGridKey");
        }
        if (string.IsNullOrEmpty(Options.Email))
        {
            throw new Exception("Null Email");
        }
        if (string.IsNullOrEmpty(Options.Name))
        {
            throw new Exception("Null Name");
        }
        await Execute(Options, subject, message, toEmail);
    }

    public async Task Execute(AuthMessageSenderOptions options, string subject, string message, string toEmail)
    {
        var client = new SendGridClient(options.SendGridKey);
        var msg = new SendGridMessage()
        {
            From = new EmailAddress(options.Email, options.Name),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(toEmail));

        // Disable click tracking.
        // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
        msg.SetClickTracking(false, false);
        var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        _logger.LogInformation(response.IsSuccessStatusCode 
                               ? $"Email to {toEmail} queued successfully!"
                               : $"Failure Email to {toEmail}");
    }

}

