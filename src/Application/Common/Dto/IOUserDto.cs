namespace ContractdocIO.Application.Common.Dto;
public class IOUserDto : IMapFrom<IOUser>
{
    public string Email { get; set; } = default!;

}
