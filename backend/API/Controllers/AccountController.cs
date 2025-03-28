﻿using Helpers.DTOs.Account;
using Helpers.DTOs.Authentication;
using Helpers.DTOs.Query;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

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

        /// <summary>
        /// Get accounts, filtered by Name, Role, Status
        /// Sort by reputation, total_credit, create_at
        /// </summary>
        /// <param name="query"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet("get-all-account-filtered")]
        public async Task<IActionResult> GetAllAccountFiltered(
            [FromQuery] Query query,
            [FromQuery] AccountFilter filter
            )
        {
            var result = await _accountService.GetAllAccountFilteredAsync(query.PageNumber, query.PageSize, filter);
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

        [HttpPost("Create Account")]
        public async Task<IActionResult> CreateAccount([FromBody] RegisterDTO registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _accountService.CreateAccount(registerDto);
            if (result == null)
            {
                return Ok("Create account failed");
            }
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAccount(UpdateAccountDTO accountDTO)
        {
            var result = await _accountService.UpdateAccountAsync(accountDTO);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpPut("update-account-status")]
        public async Task<IActionResult> UpdateAccountStatus(UpdateAccountStatusDTO updateAccountStatusDTO)
        {
            var result = await _accountService.UpdateAccountStatus(updateAccountStatusDTO);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
    }
}
