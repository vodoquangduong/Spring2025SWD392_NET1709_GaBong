using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Authentication;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Microsoft.EntityFrameworkCore;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements;

public class AccountService : IAccountService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public AccountService(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<Result<IEnumerable<AccountDTO>>> GetAllAccountAsync()
    {
        try
        {
        var queryOptions = new QueryBuilder<Account>()
            .WithTracking(false) // No tracking for efficient
            .Build();
            var accounts = await _unitOfWork.GetRepo<Account>().GetAllAsync(queryOptions);
            return Result.Success(accounts.Select(account  => account.ToAccountDTO()));
        }
        catch (Exception e)
        {
            return Result.Failure<IEnumerable<AccountDTO>>(new Error("Get all account failed", $"{e.Message}"));
        }
    }

    public async Task<Result<AccountDTO>> GetAccountByIdAsync(long id)
    {
        var queryOptions = new QueryBuilder<Account>()
            .WithTracking(false) // No tracking for efficiency
            .WithPredicate(a => a.AccountId == id) // Filter by ID
            .Build();
        var account = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);

        if (account == null) return null;

        return account.ToAccountDTO();
    }

    public async Task<Account> GetAccountByEmailAsync(string email)
    {
        var queryOptions = new QueryBuilder<Account>()
            .WithTracking(false) // No tracking for efficiency
            .WithPredicate(a => a.Email == email) // Filter by ID
            .Build();
        var account = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);

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
        var createdAccount = await _unitOfWork.GetRepo<Account>().CreateAsync(account);
        await _unitOfWork.SaveChangesAsync();
        return createdAccount;
    }

    public async Task<Account?> ResetPasswordAsync(long id, string password)
    {
        var queryOptions = new QueryBuilder<Account>()
            .WithTracking(false) // No tracking for efficiency
            .WithPredicate(a => a.AccountId == id) // Filter by ID
            .Build();
        var existedAccount = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);
        if (existedAccount == null)
        {
            return null;
        }
        existedAccount.Password = PasswordHasher.HashPassword(password);
        _unitOfWork.GetRepo<Account>().UpdateAsync(existedAccount);
        await _unitOfWork.SaveChangesAsync();
        return existedAccount;
    }

    public async Task<Result<PaginatedResult<AccountDTO>>> GetAllFreeLancerAsync(int pageSize, int pageNumber)
    {
        try
        {
            var queryOptions = new QueryBuilder<Account>()
                .WithTracking(false) // No tracking for efficient
                .WithPredicate(a => a.Role == BusinessObjects.Enums.AccountRole.Freelancer 
                                && a.Status == BusinessObjects.Enums.AccountStatus.Active)
                .Build();
            var accounts = _unitOfWork.GetRepo<Account>().Get(queryOptions);
            var paginatedAccounts = await Pagination.ApplyPaginationAsync<Account, AccountDTO>(accounts, pageNumber, pageSize, a => a.ToAccountDTO());
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
            // if(_currentUserService.Status.Equals("Inactive"))
            // {
            //     return Result.Failure<AccountDTO>(new Error("Account is inactive", "Account is inactive"));
            // }
            if(string.IsNullOrEmpty(accountDto.Name))
            {
                return Result.Failure<AccountDTO>(new Error("Update account failed", "Name cannot null"));
            }
            if(string.IsNullOrEmpty(accountDto.Address))
            {
                return Result.Failure<AccountDTO>(new Error("Update account failed","Address cannot null"));
            }
            if(string.IsNullOrEmpty(accountDto.AvatarURL))
            {
                return Result.Failure<AccountDTO>(new Error("Update account failed","Avatar URL cannot null"));
            }
            if(string.IsNullOrEmpty(accountDto.Phone))
            {
                return Result.Failure<AccountDTO>(new Error("Update account failed", "Phone number cannot null"));
            }
            var queryOptions = new QueryBuilder<Account>()
                .WithTracking(false) // No tracking for efficient
                .WithPredicate(a => a.AccountId == _currentUserService.AccountId)
                .Build();
            var existedAccount = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);
            existedAccount?.ToAccount(accountDto);
            await _unitOfWork.GetRepo<Account>().UpdateAsync(existedAccount!);
            await _unitOfWork.SaveChangesAsync();
            return Result.Success(existedAccount!.ToAccountDTO());
        }
        catch(Exception e)
        {
            return Result.Failure<AccountDTO>(new Error("Update account failed",$"{e.Message}"));
        }
    }
}
