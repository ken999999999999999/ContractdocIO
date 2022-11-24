using ContractdocIO.Application.SignedContracts.Dto;
namespace ContractdocIO.Application.SignedContracts.Queries.GetSignedContractsWithPagination;

public record GetSignedContractsWithPaginationQuery : IOrder, IRequest<PaginatedList<SignedContractBriefDto>>
{
    public bool IsSentFromMySelf { get; init; }
    public bool? IsSigned { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public string OrderBy { get; init; } = nameof(SignedContractBriefDto.Created);
    public bool IsOrderByAsc { get; init; } = false;
}

public class GetSignedContractsWithPaginationQueryHandler : IRequestHandler<GetSignedContractsWithPaginationQuery, PaginatedList<SignedContractBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetSignedContractsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<PaginatedList<SignedContractBriefDto>> Handle(GetSignedContractsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.SignedContracts.AsNoTracking()
            .WhereIf(request.IsSentFromMySelf, a => a.Contract.OwnedByUserId == _currentUserService.UserId)
            .WhereIf(!request.IsSentFromMySelf, a => a.ReceivedByUserId == _currentUserService.UserId)
            .WhereIf(request.IsSigned.HasValue, a => string.IsNullOrEmpty(a.Signature) != request.IsSigned)
            .ProjectTo<SignedContractBriefDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request);
    }
}