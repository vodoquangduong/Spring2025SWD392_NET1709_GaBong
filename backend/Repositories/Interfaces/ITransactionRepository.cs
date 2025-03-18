using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface ITransactionRepository
    {
        Task<Transaction> CreateTransationAsync(Transaction transaction);
        Task UpdateAsync(Transaction transaction);
    }
}
