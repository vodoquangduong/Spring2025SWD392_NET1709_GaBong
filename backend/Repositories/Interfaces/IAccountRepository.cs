using BusinessObjects.Models;
using Helpers.HelperClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account?> GetSingleByAccountIdAsync(long id);
        Task<Account?> GetFreelancerByAccountIdAsync(long id);
        Task<Account?> GetAccountByEmailAsync(string email);
        Task<Account> CreateAccountAsync(Account account);
        Task UpdateAsync(Account account);
        IQueryable<Account> GetAllAccountsPaging();
        IQueryable<Account> GetAllFreelancersPaging();
    }
}
