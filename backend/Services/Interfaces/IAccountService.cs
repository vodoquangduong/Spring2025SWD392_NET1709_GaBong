using System;
using BusinessObjects.Models;

namespace Services.Interfaces;

public interface IAccountService
{
    Task<IEnumerable<Account>> GetAllAccount();
}
