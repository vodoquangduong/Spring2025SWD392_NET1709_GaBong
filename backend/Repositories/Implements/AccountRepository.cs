using System;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using DAOs;
using Helpers.DTOs.Authentication;
using Helpers.HelperClasses;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implements;

public class AccountRepository : GenericRepository<Account>, IAccountRepository
{
    public AccountRepository(ApplicationDbContext context) : base(context)
    {
    }
    public async Task<Account> CreateAccountAsync(RegisterDTO registerDto)
    {
        var account = new Account()
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            Password = PasswordHasher.HashPassword(registerDto.Password),
            Role = registerDto.Role,
            Gender = registerDto.Gender,
            Phone = registerDto.Phone,
            Address = registerDto.Address,
            Birthday = registerDto.Birthday,
        };
        await _context.Accounts.AddAsync(account);
        await _context.SaveChangesAsync();
        return account;
    }

    public async Task<Account?> GetAccountByEmailAsync(string email)
    {
        return await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<IEnumerable<Account>> GetAccountsAsync()
    {
        var accountQuery = _context
            .Accounts
            .OrderBy(x => x.AccountId)
            .AsQueryable();

        return await accountQuery.ToListAsync();
    }
}
