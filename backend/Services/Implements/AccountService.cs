using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Authentication;
using Helpers.DTOs.Query;
using Helpers.HelperClasses;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Implements;

public class AccountService : IAccountService
{
    //private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;
    private readonly IAccountRepository _accountRepository;
    private readonly IMapper _mapper;
    public AccountService(
        //IUnitOfWork unitOfWork, 
        ICurrentUserService currentUserService,
        IAccountRepository accountRepository,
        IMapper mapper)
    {
        //_unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
        _accountRepository = accountRepository;
        _mapper = mapper;
    }

    public async Task<Result<PaginatedResult<AccountDTO>>> GetAllAccountAsync(int pageNumber, int pageSize)
    {
        try
        {
            //var queryOptions = new QueryBuilder<Account>()
            //    .WithTracking(false) // No tracking for efficient
            //    .Build();
            //    var accounts = _unitOfWork.GetRepo<Account>().Get(queryOptions);
            var accounts = _accountRepository.GetAllAccountsPaging();

            var paginatedAccounts = await Pagination.ApplyPaginationAsync(accounts, pageNumber, pageSize, _mapper.Map<AccountDTO>);
            return Result.Success(paginatedAccounts);
        }
        catch (Exception e)
        {
            return Result.Failure<PaginatedResult<AccountDTO>>(new Error("Get all account failed", $"{e.Message}"));
        }
    }

    
    public async Task<Result<PaginatedResult<AccountDTO>>> GetAllAccountFilteredAsync(int pageNumber, int pageSize, AccountFilter filter)
    {
        try
        {
            var accounts = _accountRepository.GetAllAccountsFilteredPaging(filter);

            var paginatedAccounts = await Pagination.ApplyPaginationAsync(accounts, pageNumber, pageSize, _mapper.Map<AccountDTO>);
            return Result.Success(paginatedAccounts);
        }
        catch (Exception e)
        {
            return Result.Failure<PaginatedResult<AccountDTO>>(new Error("Get all account filtered failed", $"{e.Message}"));
        }
    }

    public async Task<Result<AccountDTO>> GetAccountByIdAsync(long id)
    {
        //var queryOptions = new QueryBuilder<Account>()
        //    .WithTracking(false) // No tracking for efficiency
        //    .WithPredicate(a => a.AccountId == id) // Filter by ID
        //    .Build();
        //var account = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);
        var account = await _accountRepository.GetSingleByAccountIdAsync(id);

        if (account == null) return null;

        return _mapper.Map<AccountDTO>(account);
    }

    public async Task<Account> GetAccountByEmailAsync(string email)
    {
        //var queryOptions = new QueryBuilder<Account>()
        //    .WithTracking(false) // No tracking for efficiency
        //    .WithPredicate(a => a.Email == email) // Filter by ID
        //    .Build();
        //var account = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);
        var account = await _accountRepository.GetAccountByEmailAsync(email);

        if (account == null) return null;

        return account;
    }

    public async Task<Account> CreateAccount(RegisterDTO registerDto)
    {
        var account = new Account()
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            Password = PasswordHasher.HashPassword(registerDto.Password),
            Role = registerDto.Role,
            CreatedAt = DateTime.UtcNow,
        };
        //var createdAccount = await _unitOfWork.GetRepo<Account>().CreateAsync(account);
        //await _unitOfWork.SaveChangesAsync();
        var createdAccount = await _accountRepository.CreateAccountAsync(account);

        return createdAccount;
    }

    public async Task<Account?> ResetPasswordAsync(long id, string password)
    {
        //    var queryOptions = new QueryBuilder<Account>()
        //        .WithTracking(false) // No tracking for efficiency
        //        .WithPredicate(a => a.AccountId == id) // Filter by ID
        //        .Build();
        //    var existedAccount = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);
        var existedAccount = await _accountRepository.GetSingleByAccountIdAsync(id);

        if (existedAccount == null)
        {
            return null;
        }
        existedAccount.Password = PasswordHasher.HashPassword(password);

        //_unitOfWork.GetRepo<Account>().UpdateAsync(existedAccount);
        //await _unitOfWork.SaveChangesAsync();
        await _accountRepository.UpdateAsync(existedAccount);

        return existedAccount;
    }

    public async Task<Result<PaginatedResult<AccountDTO>>> GetAllFreeLancerAsync(int pageSize, int pageNumber)
    {
        try
        {
            //var queryOptions = new QueryBuilder<Account>()
            //    .WithTracking(false) // No tracking for efficient
            //    .WithPredicate(a => a.Role == BusinessObjects.Enums.AccountRole.Freelancer 
            //                    && a.Status == BusinessObjects.Enums.AccountStatus.Active)
            //    .Build();
            //var accounts = _unitOfWork.GetRepo<Account>().Get(queryOptions);
            var accounts = _accountRepository.GetAllFreelancersPaging();

            var paginatedAccounts = await Pagination.ApplyPaginationAsync<Account, AccountDTO>(accounts, pageNumber, pageSize, _mapper.Map<AccountDTO>);
            return Result.Success(paginatedAccounts);
        }
        catch (Exception e)
        {
            return Result.Failure<PaginatedResult<AccountDTO>>(new Error("Get all projects failed", $"{e.Message}"));
        }
    }

    public async Task<Result<AccountDTO>> UpdateAccountAsync(UpdateAccountDTO accountDto)
    {
        try
        {
            if (_currentUserService.Status.Equals("Inactive"))
            {
                return Result.Failure<AccountDTO>(new Error("Account is inactive", "Account is inactive"));
            }
            if (string.IsNullOrEmpty(accountDto.Name))
            {
                return Result.Failure<AccountDTO>(new Error("Update account failed", "Name cannot null"));
            }
            if (string.IsNullOrEmpty(accountDto.Address))
            {
                return Result.Failure<AccountDTO>(new Error("Update account failed", "Address cannot null"));
            }
            if (string.IsNullOrEmpty(accountDto.AvatarURL))
            {
                return Result.Failure<AccountDTO>(new Error("Update account failed", "Avatar URL cannot null"));
            }
            if (string.IsNullOrEmpty(accountDto.Phone))
            {
                return Result.Failure<AccountDTO>(new Error("Update account failed", "Phone number cannot null"));
            }

            //var queryOptions = new QueryBuilder<Account>()
            //    .WithTracking(false) // No tracking for efficient
            //    .WithPredicate(a => a.AccountId == _currentUserService.AccountId)
            //    .Build();
            //var existedAccount = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);
            var existedAccount = await _accountRepository.GetSingleByAccountIdAsync(_currentUserService.AccountId);

            _mapper.Map(accountDto, existedAccount);

            //await _unitOfWork.GetRepo<Account>().UpdateAsync(existedAccount!);
            //await _unitOfWork.SaveChangesAsync();
            await _accountRepository.UpdateAsync(existedAccount);

            return Result.Success(_mapper.Map<AccountDTO>(existedAccount));
        }
        catch (Exception e)
        {
            return Result.Failure<AccountDTO>(new Error("Update account failed", $"{e.Message}"));
        }

    }

    public Task<Result<AccountDTO>> UpdateCredit(long AccountId, decimal amount, string transacionType)
    {
        throw new NotImplementedException();
    }

    public async Task<Result<AccountDTO>> UpdateAccountStatus(UpdateAccountStatusDTO updateAccountStatusDTO)
    {
        try
        {
            if (!_currentUserService.Role.Equals("Admin"))
            {
                return Result.Failure<AccountDTO>(new Error("Update account status failed", "Only admin can update account status"));
            }

            //var existedAccount = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>
            //{
            //    Predicate = a => a.AccountId == updateAccountStatusDTO.AccountId
            //});
            var existedAccount = await _accountRepository.GetSingleByAccountIdAsync(updateAccountStatusDTO.AccountId);

            if (existedAccount == null)
            {
                return Result.Failure<AccountDTO>(new Error("Update account status failed", "Account not found"));
            }
            existedAccount.Status = Enum.Parse<AccountStatus>(updateAccountStatusDTO.Status);

            //await _unitOfWork.GetRepo<Account>().UpdateAsync(existedAccount);
            //await _unitOfWork.SaveChangesAsync();
            await _accountRepository.UpdateAsync(existedAccount);

            return Result.Success(_mapper.Map<AccountDTO>(existedAccount));
        }
        catch (Exception e)
        {
            return Result.Failure<AccountDTO>(new Error("Update account status failed", $"{e.Message}"));
        }
    }
}
