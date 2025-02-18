using System;
using System.Threading.Tasks;
using Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IProjectRepository ProjectRepository { get; }
    IAccountRepository AccountRepository { get; }
    // Add other repositories

    Task<int> SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitAsync();
    Task RollbackAsync();
} 