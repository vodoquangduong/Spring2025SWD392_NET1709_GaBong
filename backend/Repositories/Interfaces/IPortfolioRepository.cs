using BusinessObjects.Enums;
using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<Portfolio?> GetSingleByIdAsync(long porfolioId);
        Task<Portfolio?> GetSingleByFreelancerIdAsync(long accountId);
        Task<Portfolio?> GetSingleByFreelancerIdAsync(long accountId, PortfolioStatus portfolioStatus);
        Task<Portfolio> CreateAsync(Portfolio portfolio);
        Task UpdateAsync(Portfolio portfolio);
        IQueryable<Portfolio> GetAllPaging();
        IQueryable<Portfolio> GetAllByStatusPaging(PortfolioStatus portfolioStatus);
    }
}
