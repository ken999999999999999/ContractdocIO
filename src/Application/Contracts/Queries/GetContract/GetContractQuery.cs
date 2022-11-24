using ContractdocIO.Application.Contracts.Dto;

namespace ContractdocIO.Application.Contracts.Queries.GetContractsWithPagination;

public record GetContractQuery : IRequest<ContractDto>
{
    public int Id { get; init; }
}

public class GetContractQueryHandler : IRequestHandler<GetContractQuery, ContractDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetContractQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<ContractDto> Handle(GetContractQuery request, CancellationToken cancellationToken)
    {
        return await _context.Contracts.AsNoTracking()
            .Where(a => a.OwnedByUserId == _currentUserService.UserId)
            .Where(a => a.Id == request.Id)
            .ProjectTo<ContractDto>(_mapper.ConfigurationProvider)
            .SingleAsync();
    }
}