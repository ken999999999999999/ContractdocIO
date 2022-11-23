namespace ContractdocIO.Domain.Entities;

public class Option : BaseEntity
{
    public int ContractId { get; set; }

    public Contract Contract { get; set; } = null!;

    public string Content { get; set; } = default!;

    public bool IsRequired { get; set; } = false;

    public int Order { get; set; }

    public CheckOption ToCheckOption() => new CheckOption
    {
        OptionId = Id,
        Content = Content,
        IsRequired = IsRequired,
        Order = Order,
    };


}

