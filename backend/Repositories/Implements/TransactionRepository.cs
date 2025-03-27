using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Query;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public TransactionRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Transaction> CreateTransationAsync(Transaction transaction)
        {
            var createdTransaction = await _unitOfWork
                .GetRepo<Transaction>()
                .CreateAsync(transaction);
            await _unitOfWork.SaveChangesAsync();
            return createdTransaction;
        }

        public async Task CreateAllTransationAsync(List<Transaction> transactions)
        {
            await _unitOfWork.GetRepo<Transaction>().CreateAllAsync(transactions);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<Transaction?> GetSingleByIdAsync(long transationId)
        {
            var transactionQueryOptions = new QueryBuilder<Transaction>()
                .WithTracking(false)
                .WithPredicate(t => t.TransactionId == transationId)
                .Build();
            var transaction = await _unitOfWork
                .GetRepo<Transaction>()
                .GetSingleAsync(transactionQueryOptions);

            return transaction;
        }

        public async Task UpdateAsync(Transaction transaction)
        {
            await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);
            await _unitOfWork.SaveChangesAsync();
        }

        public IQueryable<Transaction> GetAllTransactionsPaging()
        {
            var query = new QueryBuilder<Transaction>()
                .WithTracking(false)
                .WithOrderBy(trans => trans.OrderBy(t => t.TransactionId))
                .Build();
            var transactions = _unitOfWork
                .GetRepo<Transaction>()
                .Get(query);

            return transactions;
        }

        public IQueryable<Transaction> GetTransactionsByTypePaging(TransactionFilter filter)
        {
            var filterType = filter.TransactionType.Select(typ => Enum.Parse<TransactionType>(typ));

            var queryOptions = new QueryBuilder<Transaction>()
                .WithTracking(false)
                .WithPredicate(trans =>
                    (filterType.Any(typ => trans.Type.Equals(typ)))
                ).WithOrderBy(trans =>
                    trans.OrderByDescending(trans => trans.CreatedAt)
                ).Build();
            var transactions = _unitOfWork
                .GetRepo<Transaction>()
                .Get(queryOptions);

            return transactions;
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactionByAccountIdAsync(
            long accountId
        )
        {
            var queryOptions = new QueryBuilder<Transaction>()
                .WithTracking(false)
                .WithPredicate(t => t.AccountId == accountId)
                .Build();
            var transaction = await _unitOfWork.GetRepo<Transaction>().GetAllAsync(queryOptions);

            return transaction;
        }
    }
}
