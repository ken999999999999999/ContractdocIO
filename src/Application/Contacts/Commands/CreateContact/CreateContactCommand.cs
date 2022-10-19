using ContactdocIO.Domain.Entities;

namespace ContactdocIO.Application.Contacts.Commands.CreateContact;

public record CreateContactCommand : IRequest<int>
{
    public int? ParentContactId { get; set; }

    public string Content { get; set; } = default!;

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public IList<OptionInputDto> Options { get; set; } = new List<OptionInputDto>();
}

public class CreateContactCommandHandler : IRequestHandler<CreateContactCommand, int>
{
    private readonly IApplicationDbContext _context;

    private readonly ICurrentUserService _currentUserService;

    public CreateContactCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }



    public async Task<int> Handle(CreateContactCommand request, CancellationToken cancellationToken)
    {
        var entity = new Contact();

        string contactGroupId;

        if (request.ParentContactId.HasValue)
        {
            contactGroupId = await _context.Contacts.Where(a => a.Id == request.ParentContactId).Select(a => a.ContactGroupId).FirstAsync();
            entity.Version = (await _context.Contacts.Where(a => a.ContactGroupId == contactGroupId).MaxAsync(a => a.Version)) + 1;
        }
        else
        {
            contactGroupId = new Guid().ToString();
        }


        entity.Content = request.Content;
        entity.Type = request.Type;
        entity.Title = request.Title;
        entity.Options = request.Options.Select(a => new Option
        {
            Content = a.Content,
            IsRequired = a.IsRequired,
            Order = a.Order
        }).ToList();

        entity.OwnedByUserId = _currentUserService.UserId!;

        _context.Contacts.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}