
using Helpers.DTOs.Portfolio;
using Helpers.HelperClasses;
using Services.Interfaces.Portfolio;

namespace Services.Interfaces
{
    public interface IPortfolioService
    {
        Task<Result<PortfolioDTO>> CreatePortfolioAsync(CreatePortfolioDTO portfolioDto);
        Task<Result<PaginatedResult<PortfolioDTO>>> GetAllPortfolioAsync(int pageNumber, int pageSize);
        Task<Result<PortfolioDTO>> GetPortfolioByFreelancerIdAsync(long id);
        Task<Result<PortfolioDTO>> GetPortfolioByIdAsync(long id);
        Task<Result<PortfolioDTO>> UpdatePortfolioAsync(UpdatePortfolioDTO updatePortfolioDto);
        Task<Result<PortfolioDTO>> VerifyPortfolioAsync(long  portfolioId, VerifyPortfolioDTO verifyPortfolioDto);
        Task<Result<PortfolioDTO>> SubmitPortfolioAsync();
        Task<Result<PublicPortfolioDTO>> GetPublicPortfolioByFreelancerIdAsync(long id);
        Task<Result<PaginatedResult<PublicPortfolioDTO>>> GetPublicPortfolioPendingList(int pageNumber, int pageSize);
        Task<Result<PaginatedResult<PublicPortfolioDTO>>> GetPublicPortfolioVerifiedList(int pageNumber, int pageSize);
    }
}