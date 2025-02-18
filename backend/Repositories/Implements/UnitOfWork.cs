using DAOs;
using Microsoft.EntityFrameworkCore.Storage;
using Repositories.Implements;
using Repositories.Interfaces;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IProjectRepository? _projectRepository;
    private IAccountRepository? _accountRepository;
    private IBidRepository? _bidRepository;
    private IDbContextTransaction? _transaction;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public IProjectRepository ProjectRepository
    {
        get { return _projectRepository ??= new ProjectRepository(_context); }
    }

    public IAccountRepository AccountRepository
    {
        get { return _accountRepository ??= new AccountRepository(_context); }
    }

    public IBidRepository BidRepository
    {
        get { return _bidRepository ??= new BidRepository(_context); }
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public async Task BeginTransactionAsync()
    {
        _transaction = await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitAsync()
    {
        if (_transaction == null) throw new InvalidOperationException("Transaction not started");
        try
        {
            await _transaction.CommitAsync();
        }
        catch
        {
            await _transaction.RollbackAsync();
            throw;
        }
        finally
        {
            _transaction.Dispose();
        }
    }

    public async Task RollbackAsync()
    {
        if (_transaction == null) throw new InvalidOperationException("Transaction not started");
        await _transaction.RollbackAsync();
        _transaction.Dispose();
    }

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}