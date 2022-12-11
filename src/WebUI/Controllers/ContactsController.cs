using ContractdocIO.Application.Common.Models;
using ContractdocIO.Application.Contracts.Commands.CreateContract;
using ContractdocIO.Application.Contracts.Dto;
using ContractdocIO.Application.Contracts.Queries.GetContractsWithContractId;
using ContractdocIO.Application.Contracts.Queries.GetContractsWithPagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContractdocIO.WebUI.Controllers;

[Authorize]
public class ContractsController : ApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateContractCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpGet("contractId")]
    public async Task<ActionResult<PaginatedList<ContractBriefDto>>> GetWithContractId([FromQuery] GetContractsWithContractIdQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ContractDto>> Get(int id)
    {
        return await Mediator.Send(new GetContractQuery() { Id = id });
    }
    [HttpGet]
    public async Task<ActionResult<PaginatedList<ContractBriefDto>>> GetWithPagination([FromQuery] GetContractsWithPaginationQuery command)
    {
        return await Mediator.Send(command);
    }


}
