using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Authentication;
using Helpers.HelperClasses;

namespace Services.Interfaces;

public interface IAccountService
{
    Task<Result<IEnumerable<AccountDTO>>> GetAllAccountAsync();
    Task<Result<AccountDTO>> GetAccountByIdAsync(long id);
    Task<Account> GetAccountByEmailAsync(string email);
    Task<Account> CreateAccount(RegisterDTO registerDto);
    Task<Account?> ResetPasswordAsync(long id, string password);
}
