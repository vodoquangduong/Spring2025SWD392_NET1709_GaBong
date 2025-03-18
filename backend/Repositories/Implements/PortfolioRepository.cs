using BusinessObjects.Enums;
using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public PortfolioRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Portfolio?> GetSingleByIdAsync(long porfolioId)
        {
            var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
            {
                Predicate = p => p.PortfolioId == porfolioId
            });
            return portfolio;
        }

        public async Task<Portfolio?> GetSingleByFreelancerIdAsync(long accountId)
        {
            var portfolioExist = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
            {
                Predicate = p => p.FreelancerId == accountId
            });

            return portfolioExist;
        }

        public async Task<Portfolio?> GetSingleByFreelancerIdAsync(long accountId, PortfolioStatus portfolioStatus)
        {
            var queryOptions = new QueryBuilder<Portfolio>()
                .WithPredicate(p => p.FreelancerId == accountId && p.Status == portfolioStatus)
                .WithInclude(p => p.Account)
                .WithTracking(false)
                .Build();
            var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(queryOptions);

            return portfolio;
        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            var result = await _unitOfWork.GetRepo<Portfolio>().CreateAsync(portfolio);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task UpdateAsync(Portfolio portfolio)
        {
            await _unitOfWork.GetRepo<Portfolio>().UpdateAsync(portfolio);
            await _unitOfWork.SaveChangesAsync();
        }

        public IQueryable<Portfolio> GetAllPaging()
        {
            var portfolios = _unitOfWork.GetRepo<Portfolio>().Get(new QueryOptions<Portfolio>());
            return portfolios;
        }

        public IQueryable<Portfolio> GetAllByStatusPaging(PortfolioStatus portfolioStatus)
        {
            var queryOptions = new QueryBuilder<Portfolio>()
                .WithTracking(false)
                .WithInclude(p => p.Account)
                .WithPredicate(p => p.Status == portfolioStatus)
                .Build();
            var query = _unitOfWork.GetRepo<Portfolio>().Get(queryOptions);

            return query;
        }
    }
}
