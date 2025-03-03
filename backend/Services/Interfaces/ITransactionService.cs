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
        Task<TransactionDTO> GetTransactionByIdAsync(long id);
        Task<Result<TransactionDTO>> CreateTransactionAsync(CreateTransactionDTO createTransactionDTO);
        Task<TransactionDTO> FinishPaymentAsync(long id);
        Task<TransactionDTO> FinishMilestoneAsync(long milestoneId);
        Task<TransactionDTO> CreateProjectPaymentAsync(long projectId);
        Task<TransactionDTO> CreateBidAsync(long bidId);
    }
}