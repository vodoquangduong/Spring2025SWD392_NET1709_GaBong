using System;
using BusinessObjects.Models;
using Helpers.DTOs.Authentication;

namespace Repositories.Interfaces;

public interface IAccountRepository
{
    Task<IEnumerable<Account>> GetAccountsAsync();

    Task<Account?> GetAccountByEmailAsync(string email);
    Task<Account> CreateAccountAsync(RegisterDTO registerDto);
}
