using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Repositories.Implements
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly UnitOfWork _unitOfWork;

        public TransactionRepository(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Transaction> CreateTransationAsync(Transaction transaction)
        {
            var createdTransaction = await _unitOfWork.GetRepo<Transaction>().CreateAsync(transaction);
            await _unitOfWork.SaveChangesAsync();
            return createdTransaction;
        }

        public async Task UpdateAsync(Transaction transaction)
        {
            await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
