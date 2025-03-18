using BusinessObjects.Models;
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
            var createdTransaction = await _unitOfWork.GetRepo<Transaction>().CreateAsync(transaction);
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
            var transaction = await _unitOfWork.GetRepo<Transaction>().GetSingleAsync(transactionQueryOptions);

            return transaction;
        }
        public async Task UpdateAsync(Transaction transaction)
        {
            await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);
            await _unitOfWork.SaveChangesAsync();
        }
        public IQueryable<Transaction> GetAllTransactionsPaging()
        {
            var transactions = _unitOfWork.GetRepo<Transaction>().Get(new QueryOptions<Transaction>());

            return transactions;
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactionByAccountIdAsync(long accountId)
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
