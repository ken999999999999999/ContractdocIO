using ContactdocIO.Application.Contacts.Commands.CreateContact;
using FluentValidation;

namespace CleanArchitecture.Application.TodoItems.Commands.CreateTodoItem;

public class CreateContactCommandValidator : AbstractValidator<CreateContactCommand>
{

    private IApplicationDbContext _context;
    public CreateContactCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.Title).MaximumLength(200).NotEmpty();

        RuleFor(v => v.Content).NotEmpty();

        RuleFor(v => v.Type).MaximumLength(200).NotEmpty();

        RuleForEach(v => v.Options).ChildRules(option =>
        {
            option.RuleFor(x => x.Content).MaximumLength(200).NotEmpty();
        });

        RuleFor(v => v.ParentContactId)
            .MustAsync(async (id, c) => await _context.Contacts.AnyAsync(a => a.Id == id)).When(command => command.ParentContactId.HasValue);

    }
}