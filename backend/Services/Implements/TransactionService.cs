using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.Transaction;
using Helpers.HelperClasses;
using Microsoft.Extensions.Configuration;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Implements
{
    public class TransactionService : ITransactionService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IConfiguration _configuration;

        public TransactionService(
            //IUnitOfWork unitOfWork, 
            ITransactionRepository transactionRepository,
            IAccountRepository accountRepository,
            ICurrentUserService currentUserService,
            IConfiguration configuration,
            IMapper mapper
            )
        {
            //_unitOfWork = unitOfWork;
            _transactionRepository = transactionRepository;
            _accountRepository = accountRepository;
            _currentUserService = currentUserService;
            _configuration = configuration;
            _mapper = mapper;
        }

        public Task<TransactionDTO> CreateBidAsync(long bidId)
        {
            throw new NotImplementedException();
        }

        public async Task<TransactionDTO> CreateProjectPaymentAsync(long id)
        {
            //var transactionQueryOptions = new QueryBuilder<Transaction>()
            //   .WithTracking(false)
            //   .WithPredicate(t => t.TransactionId == id)
            //   .Build();
            //var transaction = await _unitOfWork.GetRepo<Transaction>().GetSingleAsync(transactionQueryOptions);
            var transaction = await _transactionRepository.GetSingleByIdAsync(id);

            //var accountQueryOptions = new QueryBuilder<Account>()
            //    .WithTracking(false)
            //    .WithPredicate(a => a.AccountId == transaction.AccountId)
            //    .Build();
            //var account = await _unitOfWork.GetRepo<Account>().GetSingleAsync(accountQueryOptions);
            var account = await _accountRepository.GetSingleByAccountIdAsync(transaction.AccountId);

            transaction.Status = BusinessObjects.Enums.TransactionStatus.Completed;
            account.TotalCredit += transaction.Amount;

            //await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);
            //await _unitOfWork.GetRepo<Account>().UpdateAsync(account);
            //await _unitOfWork.SaveChangesAsync();
            await _transactionRepository.UpdateAsync(transaction);
            await _accountRepository.UpdateAsync(account);

            return _mapper.Map<TransactionDTO>(transaction);
        }

        public async Task<Result<TransactionDTO>> CreateTransactionAsync(CreateTransactionDTO createTransactionDTO)
        {
            try
            {
                //var user = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>
                //{
                //    Predicate = a => a.AccountId == createTransactionDTO.AccountId
                //});
                var user = _accountRepository.GetSingleByAccountIdAsync(createTransactionDTO.AccountId);

                if (user == null)
                {
                    return Result.Failure<TransactionDTO>(new Error("Create transaction failed", $"Account with account id {createTransactionDTO.AccountId} not found"));
                }
                if (createTransactionDTO.Amount <= 0)
                {
                    return Result.Failure<TransactionDTO>(new Error("Create transaction failed", "Amount must be greater than 0"));
                }
                var transaction = _mapper.Map<Transaction>(createTransactionDTO);

                //var result = await _unitOfWork.GetRepo<Transaction>().CreateAsync(transaction);
                //await _unitOfWork.SaveChangesAsync();
                var result = await _transactionRepository.CreateTransationAsync(transaction);

                return Result.Success(_mapper.Map<TransactionDTO>(result));
            }
            catch (Exception e)
            {
                return Result.Failure<TransactionDTO>(new Error("Create transaction failed", $"{e.Message}"));
            }
        }

        public async Task<TransactionDTO> FinishPaymentAsync(long id)
        {
            //var transactionQueryOptions = new QueryBuilder<Transaction>()
            //    .WithTracking(false)
            //    .WithPredicate(t => t.TransactionId == id)
            //    .Build();
            //var transaction = await _unitOfWork.GetRepo<Transaction>().GetSingleAsync(transactionQueryOptions);
            var transaction = await _transactionRepository.GetSingleByIdAsync(id);

            //var accountQueryOptions = new QueryBuilder<Account>()
            //    .WithTracking(false)
            //    .WithPredicate(a => a.AccountId == transaction.AccountId)
            //    .Build();
            //var account = await _unitOfWork.GetRepo<Account>().GetSingleAsync(accountQueryOptions);
            var account = await _accountRepository.GetSingleByAccountIdAsync(transaction.AccountId);

            transaction.Status = BusinessObjects.Enums.TransactionStatus.Completed;
            account.TotalCredit += transaction.Amount;

            //await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);
            //await _unitOfWork.GetRepo<Account>().UpdateAsync(account);
            //await _unitOfWork.SaveChangesAsync();
            await _transactionRepository.UpdateAsync(transaction);
            await _accountRepository.UpdateAsync(account);

            return _mapper.Map<TransactionDTO>(transaction);
        }

        public async Task<Result<PaginatedResult<TransactionDTO>>> GetAllTransactionAsync(int pageNumber, int pageSize)
        {
            try
            {
                //var transactions = _unitOfWork.GetRepo<Transaction>().Get(new QueryOptions<Transaction>());
                var transactions = _transactionRepository.GetAllTransactionsPaging();

                var paginatedTransactions = await Pagination.ApplyPaginationAsync(transactions, pageNumber, pageSize, _mapper.Map<TransactionDTO>);
                return Result.Success(paginatedTransactions);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<TransactionDTO>>(new Error("Get all transaction failed", $"{e.Message}"));
            }
        }

        public async Task<Result<List<TransactionDTO>>> GetTransactionByAccountIdAsync(long id)
        {
            try
            {
                //var queryOptions = new QueryBuilder<Transaction>()
                //.WithTracking(false)
                //.WithPredicate(t => t.AccountId == id)
                //.Build();
                //var transaction = await _unitOfWork.GetRepo<Transaction>().GetAllAsync(queryOptions);
                var transaction = await _transactionRepository.GetAllTransactionByAccountIdAsync(id);

                if (transaction == null)
                {
                    return Result.Failure<List<TransactionDTO>>(new Error("Transaction not found", $"Transaction with account id {id}"));
                }
                var result = transaction.Select(_mapper.Map<TransactionDTO>).ToList();
                return Result.Success(result);
            }
            catch (Exception e)
            {
                return Result.Failure<List<TransactionDTO>>(new Error("Get transaction by account id failed", $"{e.Message}"));
            }
        }

        public async Task<TransactionDTO> GetTransactionByIdAsync(long id)
        {
            //var queryOptions = new QueryBuilder<Transaction>()
            //.WithTracking(false)
            //.WithPredicate(t => t.TransactionId == id)
            //.Build();
            //var transaction = await _unitOfWork.GetRepo<Transaction>().GetSingleAsync(queryOptions);
            var transaction = await _transactionRepository.GetSingleByIdAsync(id);

            if (transaction == null)
            {
                throw new KeyNotFoundException($"Transaction with ID {id} not found.");
            }
            return _mapper.Map<TransactionDTO>(transaction);
        }
    }
}