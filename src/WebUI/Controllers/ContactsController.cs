using ContactdocIO.Application.Common.Models;
using ContactdocIO.Application.Contacts.Commands.CreateContact;
using ContactdocIO.Application.Contacts.Dto;
using ContactdocIO.Application.Contacts.Queries.GetContactsWithPagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContactdocIO.WebUI.Controllers;

[Authorize]
public class ContactsController : ApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateContactCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ContactDto>> Get(int id)
    {
        return await Mediator.Send(new GetContactQuery() { Id = id });
    }
    [HttpGet]
    public async Task<ActionResult<PaginatedList<ContactBriefDto>>> GetWithPagination([FromQuery] GetContactsWithPaginationQuery command)
    {
        return await Mediator.Send(command);
    }


}
