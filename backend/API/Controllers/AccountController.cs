﻿using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Helpers.Mappers;

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

       [HttpGet]
       public async Task<IActionResult> GetAllAccount()
       {
        var accounts = await _accountService.GetAllAccountAsync();
        var accountDTOs = accounts.Select(account => account.ToAccountDTO());
        return Ok(accountDTOs);
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
    }
}
