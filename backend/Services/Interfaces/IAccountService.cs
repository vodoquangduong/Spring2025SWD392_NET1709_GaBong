using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Authentication;
using Helpers.DTOs.Query;
using Helpers.HelperClasses;

namespace Services.Interfaces;
public interface IAccountService
{
    Task<Result<PaginatedResult<AccountDTO>>> GetAllAccountAsync(int pageNumber, int pageSize);
    Task<Result<PaginatedResult<AccountDTO>>> GetAllAccountFilteredAsync(int pageNumber, int pageSize, AccountFilter filter);
    Task<Result<PaginatedResult<AccountDTO>>> GetAllFreeLancerAsync(int pageSize, int pageNumber);
    Task<Result<AccountDTO>> GetAccountByIdAsync(long id);
    Task<Account> GetAccountByEmailAsync(string email);
    Task<Account> CreateAccount(RegisterDTO registerDto);
    Task<Account?> ResetPasswordAsync(long id, string password);
    Task<Result<AccountDTO>> UpdateCredit(long AccountId, decimal amount, string transacionType);
    Task<Result<AccountDTO>> UpdateAccountAsync(UpdateAccountDTO accountDto);
    Task<Result<AccountDTO>> UpdateAccountStatus(UpdateAccountStatusDTO updateAccountDTO);
}
