using System;
using BusinessObjects.Models;

namespace Repositories.Interfaces;

public interface IAccountRepository
{
    Task<IEnumerable<Account>> GetAccountsAsync();
}
