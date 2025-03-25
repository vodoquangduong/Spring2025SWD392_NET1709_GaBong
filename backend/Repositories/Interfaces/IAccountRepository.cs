using BusinessObjects.Models;
using Helpers.DTOs.Query;

namespace Repositories.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account?> GetSingleByAccountIdAsync(long? id);
        Task<Account?> GetFreelancerByAccountIdAsync(long id);
        Task<Account?> GetAccountByEmailAsync(string email);
        Task<Account> CreateAccountAsync(Account account);
        Task UpdateAsync(Account account);
        IQueryable<Account> GetAllAccountsPaging();
        IQueryable<Account> GetAllAccountsFilteredPaging(AccountFilter filter);
        IQueryable<Account> GetAllFreelancersPaging();
    }
}
