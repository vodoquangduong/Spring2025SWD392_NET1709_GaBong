using System;
using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Authentication;

namespace Services.Interfaces;

public interface IAccountService
{
    Task<IEnumerable<Account>> GetAllAccountAsync();
    Task<AccountDTO> GetAccountByIdAsync(long id);
    Task<Account> GetAccountByEmailAsync(string email);
    Task<Account> CreateAccount(RegisterDTO registerDto);
    Task<Account?> ResetPasswordAsync(long id, string password);
}
