using BusinessObjects.Models;
using Helpers.DTOs.Query;

namespace Repositories.Interfaces
{
    public interface ITransactionRepository
    {
        Task<Transaction> CreateTransationAsync(Transaction transaction);
        Task CreateAllTransationAsync(List<Transaction> transactions);
        Task<Transaction?> GetSingleByIdAsync(long transationId);
        Task UpdateAsync(Transaction transaction);
        IQueryable<Transaction> GetAllTransactionsPaging();
        Task<IEnumerable<Transaction>> GetAllTransactionByAccountIdAsync(long accountId);
        IQueryable<Transaction> GetTransactionsByTypePaging(TransactionFilter filter);
    }
}
