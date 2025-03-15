using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Helpers.DTOs.Query;
using Helpers.DTOs.Account;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }   


       [HttpGet("get-all-account")]
       public async Task<IActionResult> GetAllAccount([FromQuery] Query query)
       {
        var result = await _accountService.GetAllAccountAsync(query.PageNumber, query.PageSize);
        if (result.IsFailure)
        {
            return Ok(result.Error);
        }
        return Ok(result.Value);
       }

        [HttpGet("get-all-freelancer")]
        public async Task<IActionResult> GetAllFreelancer([FromQuery] Query query)
        {
            var result = await _accountService.GetAllFreeLancerAsync(query.PageSize, query.PageNumber);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountById(long id)
        {
            var account = await _accountService.GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound("Account not found");
            }
            return Ok(account);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateAccount(UpdateAccountDTO accountDTO)
        {
            var result = await _accountService.UpdateAccountAsync(accountDTO);
            if(result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpPut("update-account-status")]
        public async Task<IActionResult> UpdateAccountStatus(UpdateAccountStatusDTO updateAccountStatusDTO)
        {
            var result = await _accountService.UpdateAccountStatus(updateAccountStatusDTO);
            if(result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
    }
}
