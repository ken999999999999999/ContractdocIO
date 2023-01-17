// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ContractdocIO.Application.Common.Interfaces;
using ContractdocIO.Infrastructure.Persistence.Migrations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;

namespace ContractdocIO.WebUI.Areas.Identity.Pages.Account
{
    public class ConfirmEmailModel : PageModel
    {
        private readonly UserManager<IOUser> _userManager;
        private readonly IApplicationDbContext _context;

        public ConfirmEmailModel(UserManager<IOUser> userManager, IApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [TempData]
        public string StatusMessage { get; set; }
        public async Task<IActionResult> OnGetAsync(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToPage("/Index");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{userId}'.");
            }
            var signedContracts = await _context.SignedContracts.Where(a => a.ReceivedByEmail == user.Email).ToListAsync();

            foreach (var signedContract in signedContracts)
            {
                signedContract.ReceivedByUserId = user.Id;
            }

            var initContract = new Contract();
            initContract.ContractGroupId = Guid.NewGuid().ToString();

            initContract.Content = "<p>Dear Candidate,</p><p><br></p><p>" +
                "I am very pleased to offer your the position of IT Specialist. This is a full-time, permanent position with a start date of December 10<sup>th</sup> 2022." +
                "</p><p><br></p><p>This position will have a starting salary of $60,000.00 per year. " +
                "Your salary is payable, weekly, less required deduction, " +
                "</p><p><br></p><p>Your will receive one week of paid vacation per year, pro-rated for your first year if applicable. " +
                "Vacations are to be taken as such time or times are mutually convenient between the employer and employee." +
                "</p><p><br></p><p>You will be directly to report to David. " +
                "</p><p><br></p><p>We look forward to having you join out team and look forward to your response, " +
                "Should you have any question please don't hesitate to contract me at (111) 111-1111</p><p><br></p><p>Regards, </p><p>HR Team</p><p><br></p>";

            initContract.Type = "Employment";
            initContract.Title = "Offer of Employment";
            initContract.Options = new List<Option>() { new Option() { Content = "I accept the offer." } };

            initContract.OwnedByUserId = user.Id;
            user.Contracts.Add(initContract);

            await _context.SaveChangesAsync(new CancellationToken());

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            StatusMessage = result.Succeeded ? "Thank you for confirming your email." : "Error confirming your email.";
            return Page();
        }
    }
}
