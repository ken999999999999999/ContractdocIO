namespace ContractdocIO.Application.SignedContracts.Commands.CreateSignedContract;

public class CreateSignedContractCommandValidator : AbstractValidator<CreateSignedContractCommand>
{

    public CreateSignedContractCommandValidator()
    {
        RuleFor(v => v.Email).NotEmpty().EmailAddress();

    }
}