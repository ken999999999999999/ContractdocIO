namespace ContractdocIO.Application.SignedContracts.Commands.CreateSignedContract;

public record CreateSignedContractCommand : IRequest<int>
{
    public int ContractId { get; set; }
    public string Email { get; set; } = default!;

}

public class CreateSignedContractCommandHandler : IRequestHandler<CreateSignedContractCommand, int>
{
    private readonly IApplicationDbContext _context;

    private readonly ICurrentUserService _currentUserService;

    public CreateSignedContractCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }


    public async Task<int> Handle(CreateSignedContractCommand request, CancellationToken cancellationToken)
    {

        var contract = await _context.Contracts.Where(a => a.Id == request.ContractId && a.OwnedByUserId == _currentUserService.UserId).Include(a => a.Options).FirstOrDefaultAsync();

        if (contract == null)
        {
            throw new NotFoundException(nameof(Contract), request.ContractId);
        }


 

        var entity = contract.Send(request.Email);

        var userId = await _context.IOUsers.Where(a => a.Email == request.Email).Select(a => a.Id).FirstOrDefaultAsync();

        if (!string.IsNullOrEmpty(userId))
        {
            entity.ReceivedByUserId = userId;
        }

        _context.SignedContracts.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}