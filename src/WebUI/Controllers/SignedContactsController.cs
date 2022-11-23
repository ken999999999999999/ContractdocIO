using ContractdocIO.Application.Common.Models;
using ContractdocIO.Application.Contracts.Queries.GetSignedContracts;
using ContractdocIO.Application.SignedContracts.Commands.CreateSignedContract;
using ContractdocIO.Application.SignedContracts.Commands.UpdateSignedContract;
using ContractdocIO.Application.SignedContracts.Dto;
using ContractdocIO.Application.SignedContracts.Queries.GetSignedContractsWithPagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContractdocIO.WebUI.Controllers;

[Authorize]
public class SignedContractsController : ApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateSignedContractCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateSignedContractCommand command)
    {
        if (id != command.Id) return BadRequest();

        await Mediator.Send(command);

        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SignedContractDto>> Get(int id)
    {
        return await Mediator.Send(new GetSignedContractQuery() { Id = id });
    }
    [HttpGet]
    public async Task<ActionResult<PaginatedList<SignedContractBriefDto>>> GetWithPagination([FromQuery] GetSignedContractsWithPaginationQuery command)
    {
        return await Mediator.Send(command);
    }


}
