namespace ContractdocIO.Application.SignedContracts.Commands.UpdateSignedContract;

public record UpdateSignedContractCommand : IRequest
{
    public int Id { get; set; }
    public string Signature { get; set; } = default!;
    public IList<int> CheckOptionIds { get; set; } = new List<int>();


}
public class UpdateSignedContractCommandHandler : IRequestHandler<UpdateSignedContractCommand>
{
    private readonly IApplicationDbContext _context;

    private readonly ICurrentUserService _currentUserService;

    public UpdateSignedContractCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(UpdateSignedContractCommand request, CancellationToken cancellationToken)
    {

        var signedContact = await _context.SignedContracts.Where(a => a.Id == request.Id && a.ReceivedByUserId == _currentUserService.UserId).Include(a => a.CheckOptions).FirstOrDefaultAsync();

        if (signedContact == null)
        {
            throw new NotFoundException(nameof(Contract), request.Id);
        }

        signedContact.Signature = request.Signature;

        foreach (var checkOptionId in request.CheckOptionIds)
        {
            var checkOption = signedContact.CheckOptions.First(a => a.Id == checkOptionId);
            checkOption.IsChecked = true;
        }

        signedContact.Signed = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}