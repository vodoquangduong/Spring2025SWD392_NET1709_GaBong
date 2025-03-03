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
        Task<Result<PaginatedResult<TransactionDTO>>> GetAllTransactionAsync(int pageNumber, int pageSize);
        Task<Result<TransactionDTO>> GetTransactionByAccountIdAsync(long id);
        Task<TransactionDTO> GetTransactionByIdAsync(long id);
        Task<Result<TransactionDTO>> CreateTransactionAsync(CreateTransactionDTO createTransactionDTO);
        Task<TransactionDTO> FinishPaymentAsync(long id);


    }
}