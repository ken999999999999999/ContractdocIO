﻿namespace ContractdocIO.Application.Contracts.Dto;

public class OptionDto : IMapFrom<Option>
{
    public string Content { get; set; } = default!;

    public bool IsRequired { get; set; }

    public int Order { get; set; }
}

