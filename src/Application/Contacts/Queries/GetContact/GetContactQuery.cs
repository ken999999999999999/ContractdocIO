using ContactdocIO.Application.Contacts.Dto;

namespace ContactdocIO.Application.Contacts.Queries.GetContactsWithPagination;

public record GetContactQuery : IRequest<ContactDto>
{
    public int Id { get; init; }
}

public class GetContactQueryHandler : IRequestHandler<GetContactQuery, ContactDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetContactQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<ContactDto> Handle(GetContactQuery request, CancellationToken cancellationToken)
    {
        return await _context.Contacts
            .Where(a => a.OwnedByUserId == _currentUserService.UserId)
            .Where(a => a.Id == request.Id)
            .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
            .SingleAsync();
    }
}