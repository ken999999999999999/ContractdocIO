using ContractdocIO.Application.Contracts.Commands.CreateContract;
using FluentValidation;

namespace CleanArchitecture.Application.TodoItems.Commands.CreateTodoItem;

public class CreateContractCommandValidator : AbstractValidator<CreateContractCommand>
{

    private readonly IApplicationDbContext _context;

    public CreateContractCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.Title).MaximumLength(200).NotEmpty();

        RuleFor(v => v.Content).NotEmpty();

        RuleFor(v => v.Type).MaximumLength(200).NotEmpty();

        RuleForEach(v => v.Options).ChildRules(option =>
        {
            option.RuleFor(x => x.Content).MaximumLength(200).NotEmpty();
            option.RuleFor(x => x.Order).GreaterThanOrEqualTo(0);
        });

        RuleFor(v => v.ParentContractId)
            .MustAsync(async (id, c) => await _context.Contracts.AnyAsync(a => a.Id == id)).When(command => command.ParentContractId.HasValue);

    }
}