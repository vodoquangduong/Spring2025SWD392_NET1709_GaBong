using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Portfolio;
using Helpers.DTOs.SkillPerform;
using Helpers.HelperClasses;
using Repositories.Interfaces;
using Services.Interfaces;
using Services.Interfaces.Portfolio;

namespace Services.Implements
{
    public class PortfolioService : IPortfolioService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;
        private readonly IPortfolioRepository _porfolioRepository;
        private readonly ISkillPerformRepository _skillPerformRepository;
        private readonly IMapper _mapper;
        public PortfolioService(
            //IUnitOfWork unitOfWork, 
            ICurrentUserService currentUserService,
            IPortfolioRepository porfolioRepository,
            ISkillPerformRepository skillPerformRepository,
            IMapper mapper
            )
        {
            //_unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
            _porfolioRepository = porfolioRepository;
            _skillPerformRepository = skillPerformRepository;
            _mapper = mapper;
        }
        public async Task<Result<PortfolioDTO>> CreatePortfolioAsync(CreatePortfolioDTO createPortfolioDto)
        {
            try
            {
                #region Validation
                if (!_currentUserService.Role.Equals("Freelancer"))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Only freelancer can create portfolio"));
                }

                //var portfolioExist = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                //{
                //    Predicate = p => p.FreelancerId == _currentUserService.AccountId
                //});
                var portfolioExist = await _porfolioRepository.GetSingleByFreelancerIdAsync(_currentUserService.AccountId);

                if (portfolioExist != null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Create portfolio failed", "Portfolio already exist"));
                }
                #endregion 
                var portfolio = _mapper.Map<Portfolio>(createPortfolioDto);
                portfolio.FreelancerId = _currentUserService.AccountId;
                var skillPerform = createPortfolioDto.SkillPerforms.Select(
                    s => new SkillPerform
                    {
                        AccountId = _currentUserService.AccountId,
                        SkillId = s.SkillId,
                        Level = s.Level
                    })
                    .ToList();

                //await _unitOfWork.GetRepo<SkillPerform>().CreateAllAsync(skillPerform);
                //var result = await _unitOfWork.GetRepo<Portfolio>().CreateAsync(portfolio);
                //await _unitOfWork.SaveChangesAsync();
                await _skillPerformRepository.CreateAllAsync(skillPerform);
                var result = await _porfolioRepository.CreateAsync(portfolio);

                //var skillResult = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(
                //    new QueryBuilder<SkillPerform>()
                //    .WithTracking(false)
                //    .WithInclude(s => s.SkillCategory)
                //    .WithPredicate(s => s.AccountId == portfolio.FreelancerId)
                //    .Build()
                //    );
                var skillResult = await _skillPerformRepository.GetAllByAccountIdAsync(portfolio.FreelancerId);

                var portfolioDto = _mapper.Map<PortfolioDTO>(result);
                portfolioDto.SkillPerformDTOs = skillResult.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();
                return Result.Success(portfolioDto);
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
                //var portfolios = _unitOfWork.GetRepo<Portfolio>().Get(new QueryOptions<Portfolio>());
                var portfolios = _porfolioRepository.GetAllPaging();

                var accountIds = portfolios.Select(p => p.FreelancerId).Distinct().ToList();

                //var skillQuery = new QueryBuilder<SkillPerform>()
                //                    .WithTracking(false)
                //                    .WithInclude(s => s.SkillCategory)
                //                    .WithPredicate(s => accountIds.Contains(s.AccountId))
                //                    .Build();
                //var skillPerformList = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(skillQuery);
                var skillPerformList = await _skillPerformRepository.GetAllByAccountIdAsync(accountIds);

                var skillPerformByAccount = skillPerformList.GroupBy(s => s.AccountId)
                                                    .ToDictionary(g => g.Key, g => g.ToList());

                var paginatedPortfolios = await Pagination.ApplyPaginationAsync(
                    portfolios,
                    pageNumber,
                    pageSize,
                    portfolio =>
                    {
                        var dto = _mapper.Map<PortfolioDTO>(portfolio);
                        var skillList = skillPerformByAccount.ContainsKey(portfolio.FreelancerId)
                            ? skillPerformByAccount[portfolio.FreelancerId]
                            : new List<SkillPerform>();
                        dto.SkillPerformDTOs = skillList.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();
                        return dto;
                    }
                   );
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
                // Get portfolio with account information
                //var queryOptions = new QueryBuilder<Portfolio>()
                //    .WithTracking(false)
                //    .WithInclude(p => p.Account)
                //    .WithPredicate(p => p.FreelancerId == id)
                //    .Build();
                //var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(queryOptions);
                var portfolio = await _porfolioRepository.GetSingleByFreelancerIdAsync(id);

                if (portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(
                        new Error("Portfolio not found", $"Portfolio with freelancer id {id} not found")
                    );
                }

                // Get skill performs for this freelancer
                //var skillQuery = new QueryBuilder<SkillPerform>()
                //    .WithTracking(false)
                //    .WithInclude(s => s.SkillCategory)
                //    .WithPredicate(s => s.AccountId == id)
                //    .Build();

                //var skillPerforms = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(skillQuery);
                var skillPerforms = await _skillPerformRepository.GetAllByAccountIdAsync(id);

                // Map and combine the data
                var portfolioDto = _mapper.Map<PortfolioDTO>(portfolio);
                portfolioDto.SkillPerformDTOs = skillPerforms
                    .Select(s => _mapper.Map<SkillPerformDTO>(s))
                    .ToList();

                return Result.Success(portfolioDto);
            }
            catch (Exception e)
            {
                return Result.Failure<PortfolioDTO>(
                    new Error("Get portfolio by freelancer id failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<PortfolioDTO>> GetPortfolioByIdAsync(long id)
        {
            try
            {
                //var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                //{
                //    Predicate = p => p.PortfolioId == id
                //});
                var portfolio = await _porfolioRepository.GetSingleByIdAsync(id);

                if (portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Portfolio not found", $"Portfolio with id {id}"));
                }

                //var SkillQuery = new QueryBuilder<SkillPerform>()
                //  .WithTracking(false)
                //  .WithInclude(s => s.SkillCategory)
                //  .WithPredicate(s => s.AccountId == portfolio.FreelancerId)
                //  .Build();
                //var skillPerform = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(SkillQuery);
                var skillPerform = await _skillPerformRepository.GetAllByAccountIdAsync(portfolio.FreelancerId);

                var portfolioDto = _mapper.Map<PortfolioDTO>(portfolio);
                portfolioDto.SkillPerformDTOs = skillPerform.Select(_mapper.Map<SkillPerformDTO>).ToList();
                return Result.Success(portfolioDto);
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
                // Get portfolios with account information
                //var queryOptions = new QueryBuilder<Portfolio>()
                //    .WithTracking(false)
                //    .WithInclude(p => p.Account)
                //    .WithPredicate(p => p.Status == PortfolioStatus.Pending)
                //    .Build();
                //var query = _unitOfWork.GetRepo<Portfolio>().Get(queryOptions);
                var query = _porfolioRepository.GetAllByStatusPaging(PortfolioStatus.Pending);

                // Get all freelancer IDs from the portfolios
                var freelancerIds = query.Select(p => p.FreelancerId).Distinct().ToList();

                // Get all skill performs for these freelancers
                //var skillQuery = new QueryBuilder<SkillPerform>()
                //    .WithTracking(false)
                //    .WithInclude(s => s.SkillCategory)
                //    .WithPredicate(s => freelancerIds.Contains(s.AccountId))
                //    .Build();
                //var skillPerformList = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(skillQuery);
                var skillPerformList = await _skillPerformRepository.GetAllByAccountIdAsync(freelancerIds);

                // Group skills by account ID
                var skillPerformByAccount = skillPerformList
                    .GroupBy(s => s.AccountId)
                    .ToDictionary(g => g.Key, g => g.ToList());
                var paginatedPortfolios = await Pagination.ApplyPaginationAsync(
                    query,
                    pageNumber,
                    pageSize,
                    portfolio =>
                    {
                        var dto = _mapper.Map<PublicPortfolioDTO>(portfolio);
                        // Add skill performs if they exist for this freelancer
                        var skillList = skillPerformByAccount.ContainsKey(portfolio.FreelancerId)
                            ? skillPerformByAccount[portfolio.FreelancerId]
                            : new List<SkillPerform>();
                        dto.SkillPerform = skillList.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();
                        return dto;
                    }
                );

                return Result.Success(paginatedPortfolios);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<PublicPortfolioDTO>>(
                    new Error("View public portfolio pending list failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<PublicPortfolioDTO>> GetVerifiedPublicPortfolioByFreelancerIdAsync(long id)
        {
            try
            {
                //var queryOptions = new QueryBuilder<Portfolio>()
                //    .WithPredicate(p => p.FreelancerId == id && p.Status == PortfolioStatus.Verified)
                //    .WithInclude(p => p.Account)
                //    .WithTracking(false)
                //    .Build();
                //var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(queryOptions);
                var portfolio = await _porfolioRepository.GetSingleByFreelancerIdAsync(id, PortfolioStatus.Verified);
                if (portfolio == null)
                {
                    return Result.Failure<PublicPortfolioDTO>(new Error("Portfolio not found", $"Portfolio with Freelancer Id {id} not found"));
                }
                //var SkillQuery = new QueryBuilder<SkillPerform>()
                //  .WithTracking(false)
                //  .WithInclude(s => s.SkillCategory)
                //  .WithPredicate(s => s.AccountId == portfolio!.FreelancerId)
                //  .Build();
                //var skillPerform = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(SkillQuery);
                var skillPerform = await _skillPerformRepository.GetAllByAccountIdAsync(portfolio!.FreelancerId);

                var portfolioDto = _mapper.Map<PublicPortfolioDTO>(portfolio);
                portfolioDto.SkillPerform = skillPerform.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();
                return Result.Success(portfolioDto);
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
                //var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                //{
                //    Predicate = p => p.FreelancerId == _currentUserService.AccountId
                //});
                var portfolio = await _porfolioRepository.GetSingleByFreelancerIdAsync(_currentUserService.AccountId);

                if (portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Submit portfolio failed", $"Portfolio with freelancer id {_currentUserService.AccountId} not found"));
                }
                portfolio.Status = PortfolioStatus.Pending;

                //await _unitOfWork.GetRepo<Portfolio>().UpdateAsync(portfolio);
                //await _unitOfWork.SaveChangesAsync();
                await _porfolioRepository.UpdateAsync(portfolio);

                //var SkillQuery = new QueryBuilder<SkillPerform>()
                //  .WithTracking(false)
                //  .WithInclude(s => s.SkillCategory)
                //  .WithPredicate(s => s.AccountId == portfolio.FreelancerId)
                //  .Build();
                //var skillPerform = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(SkillQuery);
                var skillPerform = await _skillPerformRepository.GetAllByAccountIdAsync(portfolio.FreelancerId);

                var portfolioDto = _mapper.Map<PortfolioDTO>(portfolio);
                portfolioDto.SkillPerformDTOs = skillPerform.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();
                return Result.Success(portfolioDto);
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

                //<== Check if portfolio exist or not==>
                //var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                //{
                //    Predicate = p => p.FreelancerId == _currentUserService.AccountId
                //});
                var portfolio = await _porfolioRepository.GetSingleByFreelancerIdAsync(_currentUserService.AccountId);

                if (portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Update portfolio failed", $"Portfolio with freelancer id {_currentUserService.AccountId} not found"));
                }
                _mapper.Map(updatePortfolioDto, portfolio);
                portfolio.Status = PortfolioStatus.Modifying;
                //await _unitOfWork.GetRepo<Portfolio>().UpdateAsync(portfolio);
                await _porfolioRepository.UpdateAsync(portfolio);

                //<==Update skill==>
                //var existingSkills = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(new QueryOptions<SkillPerform>
                //{
                //    Predicate = s => s.AccountId == _currentUserService.AccountId
                //});
                var existingSkills = await _skillPerformRepository.GetAllByAccountIdAsync(_currentUserService.AccountId);

                var newSkills = updatePortfolioDto.SkillPerforms.Select(s => new SkillPerform
                {
                    AccountId = _currentUserService.AccountId,
                    SkillId = s.SkillId,
                    Level = s.Level
                }).ToList();
                // Find added skill
                var skillsToAdd = newSkills.Where(ns => !existingSkills.Any(es => es.SkillId == ns.SkillId)).ToList();
                // find skill update
                var skillsToUpdate = existingSkills.Where(es => newSkills.Any(ns => ns.SkillId == es.SkillId)).ToList();
                foreach (var skill in skillsToUpdate)
                {
                    skill.Level = newSkills.First(ns => ns.SkillId == skill.SkillId).Level;
                }
                // find delete skill
                var skillsToDelete = existingSkills.Where(es => !newSkills.Any(ns => ns.SkillId == es.SkillId)).ToList();

                // update
                if (skillsToAdd.Any())
                {
                    //await _unitOfWork.GetRepo<SkillPerform>().CreateAllAsync(skillsToAdd);
                    await _skillPerformRepository.CreateAllAsync(skillsToAdd);
                }
                if (skillsToDelete.Any())
                {
                    //await _unitOfWork.GetRepo<SkillPerform>().DeleteAllAsync(skillsToDelete);
                    await _skillPerformRepository.DeleteAllAsync(skillsToDelete);
                }
                if (skillsToUpdate.Any())
                {
                    foreach (var skill in skillsToUpdate)
                    {
                        //await _unitOfWork.GetRepo<SkillPerform>().UpdateAsync(skill);
                        await _skillPerformRepository.UpdateAsync(skill);
                    }
                }

                //await _unitOfWork.SaveChangesAsync();

                //var SkillQuery = new QueryBuilder<SkillPerform>()
                //   .WithTracking(false)
                //   .WithInclude(s => s.SkillCategory)
                //   .WithPredicate(s => s.AccountId == portfolio.FreelancerId)
                //   .Build();
                //var skillPerform = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(SkillQuery);
                var skillPerform = await _skillPerformRepository.GetAllByAccountIdAsync(portfolio.FreelancerId);

                var portfolioDto = _mapper.Map<PortfolioDTO>(portfolio);
                portfolioDto.SkillPerformDTOs = skillPerform.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();
                return Result.Success(portfolioDto);
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
                //<==Validation==>
                if (!_currentUserService.Role.Equals("Staff"))
                {
                    return Result.Failure<PortfolioDTO>(new Error("Verify portfolio failed", "Only staff can verify portfolio"));
                }

                //var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(new QueryOptions<Portfolio>
                //{
                //    Predicate = p => p.PortfolioId == portfolioId
                //});
                var portfolio = await _porfolioRepository.GetSingleByIdAsync(portfolioId);

                if (portfolio == null)
                {
                    return Result.Failure<PortfolioDTO>(new Error("Verify portfolio failed", $"Portfolio with id {portfolioId} not found"));
                }

                //var SkillQuery = new QueryBuilder<SkillPerform>()
                //    .WithTracking(false)
                //    .WithInclude(s => s.SkillCategory)
                //    .WithPredicate(s => s.AccountId == portfolio.FreelancerId)
                //    .Build();
                //var skillPerform = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(SkillQuery);
                var skillPerform = await _skillPerformRepository.GetAllByAccountIdAsync(portfolio.FreelancerId);

                portfolio.Status = verifyPortfolioDto.Status;

                //await _unitOfWork.GetRepo<Portfolio>().UpdateAsync(portfolio);
                //await _unitOfWork.SaveChangesAsync();
                await _porfolioRepository.UpdateAsync(portfolio);

                var portfolioDto = _mapper.Map<PortfolioDTO>(portfolio);
                portfolioDto.SkillPerformDTOs = skillPerform.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();
                return Result.Success(portfolioDto);
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
                //var queryOptions = new QueryBuilder<Portfolio>()
                //.WithTracking(false)
                //.WithInclude(p => p.Account)
                //.WithPredicate(p => p.Status == PortfolioStatus.Verified)
                //.Build();
                //var query = _unitOfWork.GetRepo<Portfolio>().Get(queryOptions);
                var query = _porfolioRepository.GetAllByStatusPaging(PortfolioStatus.Verified);

                // Get all freelancer IDs from the portfolios
                var freelancerIds = query.Select(p => p.FreelancerId).Distinct().ToList();
                // Get all skill performs for these freelancers

                //var skillQuery = new QueryBuilder<SkillPerform>()
                //    .WithTracking(false)
                //    .WithInclude(s => s.SkillCategory)
                //    .WithPredicate(s => freelancerIds.Contains(s.AccountId))
                //    .Build();
                //var skillPerformList = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(skillQuery);
                var skillPerformList = await _skillPerformRepository.GetAllByAccountIdAsync(freelancerIds);

                // Group skills by account ID
                var skillPerformByAccount = skillPerformList
                    .GroupBy(s => s.AccountId)
                    .ToDictionary(g => g.Key, g => g.ToList());
                var paginatedPortfolios = await Pagination.ApplyPaginationAsync(
                    query,
                    pageNumber,
                    pageSize,
                    portfolio =>
                    {
                        var dto = _mapper.Map<PublicPortfolioDTO>(portfolio);
                        // Add skill performs if they exist for this freelancer
                        var skillList = skillPerformByAccount.ContainsKey(portfolio.FreelancerId)
                            ? skillPerformByAccount[portfolio.FreelancerId]
                            : new List<SkillPerform>();
                        dto.SkillPerform = skillList.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();
                        return dto;
                    }
                );
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
                //var queryOptions = new QueryBuilder<Portfolio>()
                //    .WithPredicate(p => p.FreelancerId == id && p.Status == PortfolioStatus.Pending)
                //    .WithInclude(p => p.Account)
                //    .WithTracking(false)
                //    .Build();
                //var portfolio = await _unitOfWork.GetRepo<Portfolio>().GetSingleAsync(queryOptions);
                var portfolio = await _porfolioRepository.GetSingleByFreelancerIdAsync(id, PortfolioStatus.Pending);

                if (portfolio == null)
                {
                    return Result.Failure<PublicPortfolioDTO>(
                        new Error("Portfolio not found", $"Portfolio with Freelancer Id {id} not found")
                    );
                }

                //var skillQuery = new QueryBuilder<SkillPerform>()
                //    .WithTracking(false)
                //    .WithInclude(s => s.SkillCategory)
                //    .WithPredicate(s => s.AccountId == id)  // Use id directly instead of portfolio.FreelancerId
                //    .Build();
                //var skillPerform = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(skillQuery);
                var skillPerform = await _skillPerformRepository.GetAllByAccountIdAsync(id);

                var portfolioDto = _mapper.Map<PublicPortfolioDTO>(portfolio);
                portfolioDto.SkillPerform = skillPerform.Select(s => _mapper.Map<SkillPerformDTO>(s)).ToList();

                return Result.Success(portfolioDto);
            }
            catch (Exception e)
            {
                return Result.Failure<PublicPortfolioDTO>(
                    new Error("Get public portfolio by id failed", $"{e.Message}")
                );
            }
        }
    }
}