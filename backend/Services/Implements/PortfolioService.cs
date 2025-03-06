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
                if (!_currentUserService.Role.Equals("Freelancer"))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Only freelancer can create portfolio"));
                }
                var portfolioExist = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                {
                    Predicate = p => p.FreelancerId == _currentUserService.AccountId
                });
                if (portfolioExist != null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Portfolio already exist"));
                }
                if (string.IsNullOrEmpty(portfolioDto.Title) || portfolioDto.Title.Length > 50)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Title must not be empty and length < 50"));
                }
                if (string.IsNullOrEmpty(portfolioDto.About) || portfolioDto.About.Length > 500)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "About must not be empty and length < 500"));
                }
                if (string.IsNullOrEmpty(portfolioDto.Works))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Works must not be empty"));
                }
                if (string.IsNullOrEmpty(portfolioDto.Certificate))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Certificate must not be empty"));
                }
                var portfolio = portfolioDto.ToPortfolio();
                portfolio.FreelancerId =_currentUserService.AccountId;
                var result = await _unitOfWork.GetRepo<Portfolio>().CreateAsync(portfolio);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(result.ToPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PaginatedResult<PortfolioDTO>>> GetAllPortfolioAsync(int pageNumber, int pageSize)
        {
            try
            {
                var portfolios = _unitOfWork.GetRepo<Portfolio>().Get(new QueryOptions<Portfolio>());
                var paginatedPortfolios = await Pagination.ApplyPaginationAsync(portfolios, pageNumber, pageSize, portfolio => portfolio.ToPortfolioDTO());
                return Result.Success(paginatedPortfolios);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<PortfolioDTO>>(new Error("Get all portfolio failed", $"{e.Message}"));
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
                if (portfolio == null)
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
                if (portfolio == null)
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

        public async Task<Result<PaginatedResult<PublicPortfolioDTO>>> GetPublicPortfolioPendingList(int pageNumber, int pageSize)
        {
            try
            {
                var queryOptions = new QueryBuilder<Portfolio>()
                .WithTracking(false)
                .WithInclude(p => p.Account)
                .WithPredicate(p => p.Status == PortfolioStatus.Pending)
                .Build();
                var query = _unitOfWork.GetRepo<Portfolio>().Get(queryOptions);
                var paginatedPortfolios = await Pagination.ApplyPaginationAsync(query, pageNumber, pageSize, portfolio => portfolio.ToPublicPortfolioDTO());
                return Result.Success(paginatedPortfolios);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<PublicPortfolioDTO>>(new Error("View public porfolio pending list failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PublicPortfolioDTO>> GetVerifiedPublicPortfolioByFreelancerIdAsync(long id)
        {
            try
            {
                var queryOptions = new QueryBuilder<Portfolio>()
                    .WithPredicate(p => p.FreelancerId == id && p.Status == PortfolioStatus.Verified)
                    .WithInclude(p => p.Account)
                    .WithTracking(false)
                    .Build();
                var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(queryOptions);
                if (portfolio == null)
                {
                    return Result.Failure<PublicPortfolioDTO>(new Error("Portfolio not found", $"Portfolio with Freelancer Id {id} not found"));
                }

                return Result.Success(portfolio.ToPublicPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PublicPortfolioDTO>(new Error("Get public portfolio by id failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PortfolioDTO>> SubmitPortfolioAsync()
        {
            try
            {
                var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                {
                    Predicate = p => p.FreelancerId == _currentUserService.AccountId
                });
                if (portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Submit portfolio failed", $"Portfolio with freelancer id {_currentUserService.AccountId} not found"));
                }
                portfolio.Status = PortfolioStatus.Pending;
                await _unitOfWork.GetRepo<Portfolio>().UpdateAsync(portfolio);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(portfolio.ToPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PortfolioDTO>(new Error("Submit portfolio failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PortfolioDTO>> UpdatePortfolioAsync(UpdatePortfolioDTO updatePortfolioDto)
        {
            try
            {
                var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                {
                    Predicate = p => p.FreelancerId == _currentUserService.AccountId
                });
                if (portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Update portfolio failed", $"Portfolio with freelancer id {_currentUserService.AccountId} not found"));
                }
                if (string.IsNullOrWhiteSpace(updatePortfolioDto.Title) || updatePortfolioDto.Title.Length > 50)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Update portfolio failed", $"Title can not empty or length > 50"));
                }
                if (string.IsNullOrWhiteSpace(updatePortfolioDto.Works))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Update portfolio failed", $"Work can not empty"));
                }
                if (string.IsNullOrWhiteSpace(updatePortfolioDto.Certificate))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Update portfolio failed", $"Certificate can not empty"));
                }
                if (string.IsNullOrWhiteSpace(updatePortfolioDto.About) || updatePortfolioDto.About.Length > 500)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Update portfolio failed", $"About can not empty or length > 500"));
                }
                portfolio.ToPortfolio(updatePortfolioDto);
                await _unitOfWork.GetRepo<Portfolio>().UpdateAsync(portfolio);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(portfolio.ToPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PortfolioDTO>(new Error("Update portfolio failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PortfolioDTO>> VerifyPortfolioAsync(long portfolioId, VerifyPortfolioDTO verifyPortfolioDto)
        {
            try
            {
                if (!_currentUserService.Role.Equals("Staff"))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Verify portfolio failed", "Only staff can verify portfolio"));
                }
                var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                {
                    Predicate = p => p.PortfolioId == portfolioId
                });
                if (portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Verify portfolio failed", $"Portfolio with id {portfolioId} not found"));
                }
                portfolio.Status = verifyPortfolioDto.Status;
                await _unitOfWork.GetRepo<Portfolio>().UpdateAsync(portfolio);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(portfolio.ToPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PortfolioDTO>(new Error("Verify portfolio failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PaginatedResult<PublicPortfolioDTO>>> GetPublicPortfolioVerifiedList(int pageNumber, int pageSize)
        {
            try
            {
                var queryOptions = new QueryBuilder<Portfolio>()
                .WithTracking(false)
                .WithInclude(p => p.Account)
                .WithPredicate(p => p.Status == PortfolioStatus.Verified)
                .Build();
                var query = _unitOfWork.GetRepo<Portfolio>().Get(queryOptions);
                var paginatedPortfolios = await Pagination.ApplyPaginationAsync(query, pageNumber, pageSize, portfolio => portfolio.ToPublicPortfolioDTO());
                return Result.Success(paginatedPortfolios);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<PublicPortfolioDTO>>(new Error("View public porfolio list failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PublicPortfolioDTO>> GetPendingPublicPortfolioByFreelancerIdAsync(long id)
        {
            try
            {
                var queryOptions = new QueryBuilder<Portfolio>()
                    .WithPredicate(p => p.FreelancerId == id && p.Status == PortfolioStatus.Pending)
                    .WithInclude(p => p.Account)
                    .WithTracking(false)
                    .Build();
                var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(queryOptions);
                if (portfolio == null)
                {
                    return Result.Failure<PublicPortfolioDTO>(new Error("Portfolio not found", $"Portfolio with Freelancer Id {id} not found"));
                }

                return Result.Success(portfolio.ToPublicPortfolioDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<PublicPortfolioDTO>(new Error("Get public portfolio by id failed", $"{e.Message}"));
            }
        }
    }
}