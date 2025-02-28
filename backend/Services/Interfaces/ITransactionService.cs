using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Transaction;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface ITransactionService
    {
        Task<Result<IEnumerable<TransactionDTO>>> GetAllTransactionAsync();
        Task<Result<TransactionDTO>> GetTransactionByAccountIdAsync(long id);
        Task<Result<TransactionDTO>> CreateTransactionAsync(CreateTransactionDTO createTransactionDTO);
    }
}