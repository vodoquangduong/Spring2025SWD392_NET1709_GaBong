using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs.Transaction;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Microsoft.Extensions.Configuration;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;
        private readonly IConfiguration _configuration;

        public TransactionService(IUnitOfWork unitOfWork, ICurrentUserService currentUserService, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
            _configuration = configuration;
        }

        public Task<TransactionDTO> CreateBidAsync(long bidId)
        {
            throw new NotImplementedException();
        }

        public async Task<TransactionDTO> CreateProjectPaymentAsync(long id)
        {
            var transactionQueryOptions = new QueryBuilder<Transaction>()
               .WithTracking(false)
               .WithPredicate(t => t.TransactionId == id)
               .Build();
            var transaction = await _unitOfWork.GetRepo<Transaction>().GetSingleAsync(transactionQueryOptions);
            var accountQueryOptions = new QueryBuilder<Account>()
                .WithTracking(false)
                .WithPredicate(a => a.AccountId == transaction.AccountId)
                .Build();
            var account = await _unitOfWork.GetRepo<Account>().GetSingleAsync(accountQueryOptions);
            transaction.Status = BusinessObjects.Enums.TransactionStatus.Completed;
            account.TotalCredit += transaction.Amount;

            await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);
            await _unitOfWork.GetRepo<Account>().UpdateAsync(account);
            await _unitOfWork.SaveChangesAsync();
            return transaction.ToTransactionDTO();
        }

        public async Task<Result<TransactionDTO>> CreateTransactionAsync(CreateTransactionDTO createTransactionDTO)
        {
            try
            {
                var user = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>
                {
                    Predicate = a => a.AccountId == createTransactionDTO.AccountId
                });
                if (user == null)
                {
                    return Result.Failure<TransactionDTO>(new Error("Create transaction failed", $"Account with account id {createTransactionDTO.AccountId} not found"));
                }
                // if (_currentUserService.Role != "Staff")
                // {
                //     return Result.Failure<TransactionDTO>(new Error("Create transaction failed", "You don't have permission to create transaction"));
                // }
                if (createTransactionDTO.Amount <= 0)
                {
                    return Result.Failure<TransactionDTO>(new Error("Create transaction failed", "Amount must be greater than 0"));
                }
                var transaction = new Transaction
                {
                    AccountId = createTransactionDTO.AccountId,
                    Amount = createTransactionDTO.Amount,
                    Status = createTransactionDTO.Status,
                    CreatedAt = DateTime.UtcNow,
                    Type = createTransactionDTO.Type
                };
                var result = await _unitOfWork.GetRepo<Transaction>().CreateAsync(transaction);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(result.ToTransactionDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<TransactionDTO>(new Error("Create transaction failed", $"{e.Message}"));
            }
        }

        public Task<TransactionDTO> FinishMilestoneAsync(long milestoneId)
        {
            throw new NotImplementedException();
        }

        public async Task<TransactionDTO> FinishPaymentAsync(long id)
        {
            var transactionQueryOptions = new QueryBuilder<Transaction>()
                .WithTracking(false)
                .WithPredicate(t => t.TransactionId == id)
                .Build();
            var transaction = await _unitOfWork.GetRepo<Transaction>().GetSingleAsync(transactionQueryOptions);
            var accountQueryOptions = new QueryBuilder<Account>()
                .WithTracking(false)
                .WithPredicate(a => a.AccountId == transaction.AccountId)
                .Build();
            var account  = await _unitOfWork.GetRepo<Account>().GetSingleAsync(accountQueryOptions);
            transaction.Status = BusinessObjects.Enums.TransactionStatus.Completed;
            account.TotalCredit += transaction.Amount;

            await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);
            await _unitOfWork.GetRepo<Account>().UpdateAsync(account);
            await _unitOfWork.SaveChangesAsync();
            return transaction.ToTransactionDTO();
        }

        public async Task<Result<PaginatedResult<TransactionDTO>>> GetAllTransactionAsync(int pageNumber, int pageSize)
        {
            try
            {
                var transactions = _unitOfWork.GetRepo<Transaction>().Get(new QueryOptions<Transaction>());
                var paginatedTransactions = await Pagination.ApplyPaginationAsync(transactions, pageNumber, pageSize, transaction => transaction.ToTransactionDTO());
                return Result.Success(paginatedTransactions);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<TransactionDTO>>(new Error("Get all transaction failed", $"{e.Message}"));
            }
        }

        public Task<Result<List<TransactionDTO>>> GetTransactionByAccountAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<List<TransactionDTO>>> GetTransactionByAccountIdAsync(long id)
        {
            try
            {
                var queryOptions = new QueryBuilder<Transaction>()
                .WithTracking(false)
                .WithPredicate(t => t.AccountId == id)
                .Build();
                var transaction = await _unitOfWork.GetRepo<Transaction>().GetAllAsync(queryOptions);
                if (transaction == null)
                {
                    return Result.Failure<List<TransactionDTO>>(new Error("Transaction not found", $"Transaction with account id {id}"));
                }
                var  result = transaction.Select(t => t.ToTransactionDTO()).ToList();
                return Result.Success(result);
            }
            catch (Exception e)
            {
                return Result.Failure<List<TransactionDTO>>(new Error("Get transaction by account id failed", $"{e.Message}"));
            }
        }

        public async Task<TransactionDTO> GetTransactionByIdAsync(long id)
        {
            var queryOptions = new QueryBuilder<Transaction>()
            .WithTracking(false)
            .WithPredicate(t => t.TransactionId == id)
            .Build();
            var transaction = await _unitOfWork.GetRepo<Transaction>().GetSingleAsync(queryOptions);
            if (transaction == null)
            {
                throw new KeyNotFoundException($"Transaction with ID {id} not found.");
            }
            return transaction.ToTransactionDTO();
        }
    }
}