using ContractdocIO.Application.SignedContracts.Dto;

namespace ContractdocIO.Application.Contracts.Queries.GetSignedContracts;

public record GetSignedContractQuery : IRequest<SignedContractDto>
{
    public int Id { get; init; }
}

public class GetSignedContractQueryHandler : IRequestHandler<GetSignedContractQuery, SignedContractDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetSignedContractQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<SignedContractDto> Handle(GetSignedContractQuery request, CancellationToken cancellationToken)
    {
        return await _context.SignedContracts.AsNoTracking()
            .Where(a => a.Contract.OwnedByUserId == _currentUserService.UserId || a.ReceivedByUserId == _currentUserService.UserId)
            .Where(a => a.Id == request.Id)
            .ProjectTo<SignedContractDto>(_mapper.ConfigurationProvider)
            .SingleAsync();
    }
}