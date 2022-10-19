using ContactdocIO.Application.Contacts.Dto;

namespace ContactdocIO.Application.Contacts.Queries.GetContactsWithPagination;

public record GetContactsWithPaginationQuery : IOrder, IRequest<PaginatedList<ContactBriefDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public string OrderBy { get; init; } = nameof(ContactBriefDto.Created);
    public bool IsOrderByAsc { get; init; } = false;
}

public class GetContactsWithPaginationQueryHandler : IRequestHandler<GetContactsWithPaginationQuery, PaginatedList<ContactBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetContactsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<PaginatedList<ContactBriefDto>> Handle(GetContactsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Contacts
            .Where(a => a.OwnedByUserId == _currentUserService.UserId)
            .ProjectTo<ContactBriefDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request);
    }
}