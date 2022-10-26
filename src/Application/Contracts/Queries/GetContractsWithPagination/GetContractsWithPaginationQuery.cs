using ContractdocIO.Application.Contracts.Dto;

namespace ContractdocIO.Application.Contracts.Queries.GetContractsWithPagination;

public record GetContractsWithPaginationQuery : IOrder, IRequest<PaginatedList<ContractBriefDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public string OrderBy { get; init; } = nameof(ContractBriefDto.Created);
    public bool IsOrderByAsc { get; init; } = false;
}

public class GetContractsWithPaginationQueryHandler : IRequestHandler<GetContractsWithPaginationQuery, PaginatedList<ContractBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetContractsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<PaginatedList<ContractBriefDto>> Handle(GetContractsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Contracts
            .Where(a => a.OwnedByUserId == _currentUserService.UserId)
            .ProjectTo<ContractBriefDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request);
    }
}