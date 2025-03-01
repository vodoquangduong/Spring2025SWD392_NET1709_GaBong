﻿using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Helpers.Mappers;
using Helpers.DTOs.Query;
using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.HelperClasses;

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
       public async Task<IActionResult> GetAllAccount()
       {
        var result = await _accountService.GetAllAccountAsync();
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }
        return Ok(result.Value);
       }

        [HttpGet("get-all-freelancer")]
        public async Task<IActionResult> GetAllFreelancer([FromQuery] Query query)
        {
            var result = await _accountService.GetAllFreeLancerAsync(query.PageSize, query.PageNumber);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
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
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
    }
}
