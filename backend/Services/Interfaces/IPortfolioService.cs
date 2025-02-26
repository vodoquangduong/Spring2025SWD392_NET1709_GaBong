
using Helpers.DTOs.Portfolio;
using Helpers.HelperClasses;
using Services.Interfaces.Portfolio;

namespace Services.Interfaces
{
    public interface IPortfolioService
    {
        Task<Result<PortfolioDTO>> CreatePortfolioAsync(CreatePortfolioDTO portfolioDto);
        Task<Result<IEnumerable<PortfolioDTO>>> GetAllPortfolioAsync();
        Task<Result<PortfolioDTO>> GetPortfolioByFreelancerIdAsync(long id);
        Task<Result<PortfolioDTO>> GetPortfolioByIdAsync(long id);
    }
}