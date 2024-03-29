﻿namespace ContractdocIO.Application.Contracts.Commands.CreateContract;

public record CreateContractCommand : IRequest<int>
{
    public int? ParentContractId { get; set; }

    public string Content { get; set; } = default!;

    public string Type { get; set; } = default!;

    public string Title { get; set; } = default!;

    public IList<OptionInputDto> Options { get; set; } = new List<OptionInputDto>();
}

public class CreateContractCommandHandler : IRequestHandler<CreateContractCommand, int>
{
    private readonly IApplicationDbContext _context;

    private readonly ICurrentUserService _currentUserService;

    public CreateContractCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }



    public async Task<int> Handle(CreateContractCommand request, CancellationToken cancellationToken)
    {
        var entity = new Contract();



        if (request.ParentContractId.HasValue)
        {
            var parentContract = await _context.Contracts.FirstAsync(a => a.Id == request.ParentContractId);
            entity.ContractGroupId = parentContract.ContractGroupId;
            entity.Version = (await _context.Contracts.Where(a => a.ContractGroupId == entity.ContractGroupId).MaxAsync(a => a.Version)) + 1;
            parentContract.IsCurrent = false;


        }
        else
        {
            entity.ContractGroupId = Guid.NewGuid().ToString();
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

        _context.Contracts.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}