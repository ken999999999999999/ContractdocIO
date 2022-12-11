using ContractdocIO.Application.Contracts.Dto;

namespace ContractdocIO.Application.Contracts.Queries.GetContractsWithContractId;

public record GetContractsWithContractIdQuery : IOrder, IRequest<PaginatedList<ContractBriefDto>>
{
    public int ContractId { get; set; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public string OrderBy { get; init; } = nameof(ContractBriefDto.Created);
    public bool IsOrderByAsc { get; init; } = false;
}

public class GetContractsWithContractIdQueryHandler : IRequestHandler<GetContractsWithContractIdQuery, PaginatedList<ContractBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetContractsWithContractIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<PaginatedList<ContractBriefDto>> Handle(GetContractsWithContractIdQuery request, CancellationToken cancellationToken)
    {

        var contract = await _context.Contracts.FindAsync(request.ContractId);

        return await _context.Contracts.AsNoTracking()
            .Where(a => a.ContractGroupId == contract.ContractGroupId)
            .Where(a => a.OwnedByUserId == _currentUserService.UserId)
            .ProjectTo<ContractBriefDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request);
    }
}