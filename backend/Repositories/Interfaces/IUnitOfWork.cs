using System;
using System.Threading.Tasks;
using Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository<T> GetRepo<T>() where T : class;
    Task SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollBackAsync();
    Task<bool> SaveAsync();
} 