using System;
using System.Threading.Tasks;
using Repositories.Implements;
using Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IProjectRepository ProjectRepository { get; }
    IAccountRepository AccountRepository { get; }
    IBidRepository BidRepository { get; }
    // Add other repositories

    Task<int> SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitAsync();
    Task RollbackAsync();
} 