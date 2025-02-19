using System;
using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Authentication;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements;

public class AccountService : IAccountService
{
    private readonly IUnitOfWork _unitOfWork;

    public AccountService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Account>> GetAllAccountAsync()
    {
        var queryOptions = new QueryBuilder<Account>()
            .WithTracking(false) // No tracking for efficient
            .Build();

        return await _unitOfWork.GetRepo<Account>().GetAllAsync(queryOptions);
    }

    public async Task<AccountDTO> GetAccountByIdAsync(long id)
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
}
