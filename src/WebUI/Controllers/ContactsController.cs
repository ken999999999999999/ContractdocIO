using ContactdocIO.Application.Contacts.Commands.CreateContact;
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


}
