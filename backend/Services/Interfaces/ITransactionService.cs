using Helpers.DTOs.Query;
using Helpers.DTOs.Transaction;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface ITransactionService
    {
        Task<Result<PaginatedResult<TransactionDTO>>> GetAllTransactionAsync(int pageNumber, int pageSize);
        Task<Result<TransactionDTO>> UpdateTransactionAsync(UpdateTransactionDTO updateTransactionDTO);
        Task<Result<List<TransactionDTO>>> GetTransactionByAccountIdAsync(long id);
        Task<TransactionDTO> GetTransactionByIdAsync(long id);
        Task<Result<TransactionDTO>> CreateTransactionAsync(CreateTransactionDTO createTransactionDTO);
        Task<TransactionDTO> FinishPaymentAsync(long id);
        Task<TransactionDTO> CreateProjectPaymentAsync(long projectId);
        Task<TransactionDTO> CreateBidAsync(long bidId);
        Task<Result<PaginatedResult<TransactionDTO>>> GetTransactionByTypeAsync(
            int pageNumber,
            int pageSize,
            TransactionFilter filter
        );
    }
}