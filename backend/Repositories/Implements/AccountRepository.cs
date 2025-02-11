using System;
using BusinessObjects.Models;
using DAOs;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implements;

public class AccountRepository : IAccountRepository
{
    private readonly ApplicationDbContext _context;

    public AccountRepository(ApplicationDbContext context)
    {
        _context = context;
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
