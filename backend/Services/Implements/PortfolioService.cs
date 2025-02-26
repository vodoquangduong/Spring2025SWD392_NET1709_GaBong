using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Portfolio;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Repositories.Queries;
using Services.Interfaces;
using Services.Interfaces.Portfolio;

namespace Services.Implements
{
    public class PortfolioService : IPortfolioService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;
        public PortfolioService(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }
        public async Task<Result<PortfolioDTO>> CreatePortfolioAsync(CreatePortfolioDTO portfolioDto)
        {
            try
            {
                // if(_currentUserService.Role != Role.Freelancer)
                // {
                //     return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Only freelancer can create portfolio"));
                // }
                if(string.IsNullOrEmpty(portfolioDto.Title))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Title must not be empty"));
                }
                if(string.IsNullOrEmpty(portfolioDto.About))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "About must not be empty"));
                }
                if(string.IsNullOrEmpty(portfolioDto.Works))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Works must not be empty"));
                }
                if(string.IsNullOrEmpty(portfolioDto.Certificate))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Certificate must not be empty"));
                }
                var portfolio = new Portfolio()
                {
                    FreelancerId = _currentUserService.AccountId,
                    Title = portfolioDto.Title,
                    Works = portfolioDto.Works,
                    Certificate = portfolioDto.Certificate,
                    About = portfolioDto.About,
                    Status = PortfolioStatus.Pending,
                };
                var result = await _unitOfWork.GetRepo<Portfolio>().CreateAsync(portfolio);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(result.ToPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", $"{e.Message}"));
            }
        }

        public async Task<Result<IEnumerable<PortfolioDTO>>> GetAllPortfolioAsync()
        {
            try
            {
                var portfolios = await _unitOfWork.GetRepo<Portfolio>().GetAllAsync(new QueryOptions<Portfolio>());
                return Result.Success(portfolios.Select(portfolio => portfolio.ToPortfolioDTO()));
            }
            catch (Exception e)
            {
                return Result.Failure<IEnumerable<PortfolioDTO>>(new Error("Get all portfolio failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PortfolioDTO>> GetPortfolioByFreelancerIdAsync(long id)
        {
            try
            {
                var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                {
                    Predicate = p => p.FreelancerId == id
                });
                if(portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Portfolio not found", $"Portfolio with freelancer id {id}"));
                }
                return Result.Success(portfolio.ToPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PortfolioDTO>(new Error("Get portfolio by freelancer id failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PortfolioDTO>> GetPortfolioByIdAsync(long id)
        {
            try
            {
                var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                {
                    Predicate = p => p.PortfolioId == id
                });
                if(portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Portfolio not found", $"Portfolio with id {id}"));
                }
                return Result.Success(portfolio.ToPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PortfolioDTO>(new Error("Get portfolio by id failed", $"{e.Message}"));
            }
        }
    }
}