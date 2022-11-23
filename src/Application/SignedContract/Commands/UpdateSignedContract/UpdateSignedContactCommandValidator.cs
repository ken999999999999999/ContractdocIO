namespace ContractdocIO.Application.SignedContracts.Commands.UpdateSignedContract;

public class UpdateSignedContractCommandValidator : AbstractValidator<UpdateSignedContractCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public UpdateSignedContractCommandValidator(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;

        RuleFor(a => a.Signature).NotEmpty();

        RuleFor(a => a).CustomAsync(IsValid);

    }

    private async Task IsValid(UpdateSignedContractCommand command, ValidationContext<UpdateSignedContractCommand> validationContext, CancellationToken arg3)
    {
        var signedContract = await _context.SignedContracts.Include(a => a.CheckOptions).FirstOrDefaultAsync(a => a.Id == command.Id);

        if (signedContract == null)
        {
            validationContext.AddFailure(nameof(SignedContract), "Contract is not exist");
            return;
        }

        if (signedContract.ReceivedByUserId != _currentUserService.UserId)
        {
            validationContext.AddFailure(nameof(IOUser), "Invalid Permission");
            return;
        }

        if (!string.IsNullOrEmpty(signedContract.Signature))
        {
            validationContext.AddFailure(nameof(IOUser), "Contract has been signed already");
            return;
        }

        if (signedContract.CheckOptions.Count > 0)
        {

            var checkOptionsIds = signedContract.CheckOptions.Select(a => a.Id).ToList();

            if (command.CheckOptionIds.Any(a => !checkOptionsIds.Contains(a)))
            {
                validationContext.AddFailure(nameof(CheckOption), $"Invalid Option");
                return;
            }

            var requiredCheckOptionsIds = signedContract.CheckOptions.Where(a => a.IsRequired).Select(a => a.Id).ToList();

            if (requiredCheckOptionsIds.Any(a => !command.CheckOptionIds.Contains(a)))
            {
                validationContext.AddFailure(nameof(CheckOption), $"Please check all required options!");
                return;
            }


        }

    }
}