using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Project;
using Helpers.DTOs.Query;
using Helpers.HelperClasses;
using Repositories.Interfaces;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class ProjectService : IProjectService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IProjectRepository _projectRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly ISkillRequiredRepository _skillRequiredRepository;
        private readonly ISkillCategoryRepository _skillCategoryRepository;
        private readonly IBidRepository _bidRepository;
        private readonly IMilestoneRepository _milestoneRepository;
        public ProjectService(
            //IUnitOfWork unitOfWork,
            ICurrentUserService currentUserService,
            IProjectRepository projectRepository,
            IAccountRepository accountRepository,
            ISkillRequiredRepository skillRequiredRepository,
            ISkillCategoryRepository skillCategoryRepository,
            IMilestoneRepository milestoneRepository,
            IBidRepository bidRepository,
            IMapper mapper
            )
        {
            //_unitOfWork = unitOfWork;
            _projectRepository = projectRepository;
            _accountRepository = accountRepository;
            _currentUserService = currentUserService;
            _skillRequiredRepository = skillRequiredRepository;
            _skillCategoryRepository = skillCategoryRepository;
            _milestoneRepository = milestoneRepository;
            _bidRepository = bidRepository;
            _mapper = mapper;
        }

        public async Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO projectDto)
        {
            try
            {
                //<==Get client account==>
                //var queryOption = new QueryBuilder<Account>()
                //    .WithTracking(false)
                //    .WithPredicate(a => a.AccountId == _currentUserService.AccountId)
                //    .Build();
                //var client = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOption);
                var client = await _accountRepository.GetSingleByAccountIdAsync(_currentUserService.AccountId);

                //<==Create new project==>
                #region Validation
                if (!_currentUserService.Role.Equals("Client"))
                {
                    return Result.Failure<ProjectDTO>(new Error("Create peoject failed", "Only client can create project"));
                }
                if (projectDto.EstimateBudget < 100)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error(
                            "Create project failed",
                            "Estimate budget must be greater than 100"
                        )
                    );
                }
                if (client.TotalCredit - client.LockCredit < projectDto.EstimateBudget)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error(
                            "Create project failed",
                            "Your total credit not enough to paid Estimate budget"
                        )
                    );
                }

                // Add skill validation
                foreach (var skillId in projectDto.SkillIds)
                {
                    //var skillExists = await _unitOfWork.GetRepo<SkillCategory>()
                    //    .GetSingleAsync(new QueryOptions<SkillCategory>
                    //    {
                    //        Predicate = s => s.SkillId == skillId
                    //    });
                    var skillExists = await _skillCategoryRepository.GetSingleAsync(skillId);

                    if (skillExists == null)
                    {
                        return Result.Failure<ProjectDTO>(
                            new Error(
                                "Create project failed",
                                $"Skill with ID {skillId} does not exist"
                            )
                        );
                    }
                }
                #endregion 
                //<========Create========>
                var project = _mapper.Map<Project>(projectDto);
                project.ClientId = _currentUserService.AccountId;

                //var createProject = await _unitOfWork.GetRepo<Project>().CreateAsync(project);
                //await _unitOfWork.SaveChangesAsync();
                var createProject = await _projectRepository.CreateAsync(project);

                //<==Create SkillRequired==>
                var skillRequireds = projectDto.SkillIds.Select(skillId => new SkillRequired
                {
                    ProjectId = createProject.ProjectId,
                    SkillId = skillId
                }).ToList();

                //await _unitOfWork.GetRepo<SkillRequired>().CreateAllAsync(skillRequireds);
                await _skillRequiredRepository.CreateAllAsync(skillRequireds);

                //<==Create Milestone==>
                var milestones = projectDto.Milestones.Select(m =>
                    {
                        var milestone = _mapper.Map<Milestone>(m);
                        milestone.ProjectId = createProject.ProjectId;
                        milestone.Status = MilestoneStatus.NotStarted;
                        return milestone;
                    })
                    .ToList();
                //await _unitOfWork.GetRepo<Milestone>().CreateAllAsync(milestones);
                //await _unitOfWork.SaveChangesAsync();
                await _milestoneRepository.CreateAllAsync(milestones);

                //<==Lock credit==>
                client.LockCredit += createProject.EstimateBudget;

                //await _unitOfWork.GetRepo<Account>().UpdateAsync(client);
                await _accountRepository.UpdateAsync(client);
                //await _unitOfWork.SaveChangesAsync();

                //<==Save change==>
                return Result.Success(_mapper.Map<ProjectDTO>(createProject));
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDTO>(
                    new Error("Create project failed", $"{e.Message}")
                );
            }
        }


        //TODO: Not implement
        public Task<bool> DeleteProjectAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<PaginatedResult<ProjectDTO>>> GetAllProjectsVerifiedAsync(
            int pageNumber,
            int pageSize,
            ProjectFilter filter
        )
        {
            try
            {
                //var queryOptions = new QueryBuilder<Project>()
                //    .WithTracking(false) // No tracking for efficient
                //    .WithInclude(p => p.SkillRequired)
                //    .WithInclude(p => p.Milestones)
                //    .WithInclude(p => p.Bids)
                //    .WithPredicate(p =>
                //        p.Status == ProjectStatus.Verified
                //        && p.Milestones.Any()
                //        && p.SkillRequired.Any()
                //        && (
                //            string.IsNullOrEmpty(filter.ProjectName)
                //            || p.ProjectName.ToLower().Contains(filter.ProjectName.ToLower())
                //        )
                //        && (filter.MinBudget == null || p.EstimateBudget >= filter.MinBudget)
                //        && (filter.MaxBudget == null || p.EstimateBudget <= filter.MaxBudget)
                //        && (
                //            filter.SkillIds == null
                //            || filter.SkillIds.All(id => p.SkillRequired.Any(s => s.SkillId == id))
                //        )
                //        && (
                //            string.IsNullOrEmpty(filter.Location)
                //            || p.Location.Contains(filter.Location)
                //        )
                //    )
                //    .WithOrderBy(q =>
                //    {
                //        switch (filter.SortBy)
                //        {
                //            case "newest":
                //                return q.OrderByDescending(p => p.PostDate); // Newest
                //            case "oldest":
                //                return q.OrderBy(p => p.PostDate); // Oldest
                //            case "highest_budget":
                //                return q.OrderByDescending(p => p.EstimateBudget); // Max budget
                //            case "lowest_budget":
                //                return q.OrderBy(p => p.EstimateBudget); // Min budget
                //            default:
                //                return q.OrderByDescending(p => p.PostDate); // Default: newest
                //        }
                //    })
                //    .Build();
                //var query = _unitOfWork.GetRepo<Project>().Get(queryOptions);
                var query = _projectRepository.GetAllProjectsVerifiedPaging(filter);


                var paginatedProjects = await Pagination.ApplyPaginationAsync(
                    query,
                    pageNumber,
                    pageSize,
                    _mapper.Map<ProjectDTO>
                );
                return Result.Success(paginatedProjects);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<ProjectDTO>>(
                    new Error("Get all projects failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<ProjectDetailDTO>> GetProjectByIdAsync(long projectId)
        {
            try
            {
                //var projectQueryOptions = new QueryBuilder<Project>()
                //    .WithTracking(false) // No tracking for efficient
                //    .WithInclude(p => p.SkillRequired)
                //    .WithInclude(p => p.Milestones)
                //    .WithInclude(p => p.Bids)
                //    .WithPredicate(project =>
                //        project.ProjectId == projectId
                //        && project.Milestones.Any()
                //        && project.SkillRequired.Any()
                //    )
                //    .Build();
                //var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(projectQueryOptions);
                var project = _projectRepository.GetProjectWithSkillMilestoneBidAsync(projectId);

                //var bidQueryOptions = new QueryBuilder<Bid>()
                //    .WithTracking(false)
                //    .WithInclude(b => b.BidOwner)
                //    .WithPredicate(b => b.ProjectId == projectId)
                //    .Build();
                //var bids = await _unitOfWork.GetRepo<Bid>().GetAllAsync(bidQueryOptions);
                //========
                //var bids = await _bidRepository.GetBidsByProjectAsync(projectId);
                //=========

                //var skillQuerry = new QueryBuilder<SkillRequired>()
                //    .WithTracking(false)
                //    .WithInclude(s => s.SkillCategory)
                //    .WithPredicate(s => s.ProjectId == projectId)
                //    .Build();
                //var skill = await _unitOfWork.GetRepo<SkillRequired>().GetAllAsync(skillQuerry);
                //=====
                //var skillQuery = _skillRequiredRepository.GetSkillByProjectIdAsync(projectId);
                //=====

                if (project == null)
                {
                    return Result.Failure<ProjectDetailDTO>(
                        new Error("Get project failed", "Project not found")
                    );
                }
                var result = _mapper.Map<ProjectDetailDTO>(project);
                return Result.Success(result);
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDetailDTO>(
                    new Error("Get project failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<ProjectDTO>> UpdateProjectAsync(
            UpdateProjectDTO updateProjectDTO,
            long projectId
        )
        {
            try
            {
                //var queryOptions = new QueryBuilder<Project>()
                //    .WithTracking(true)
                //    .WithPredicate(a => a.ProjectId == projectId) // Filter by ID
                //    .Build();

                //var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                var project = await _projectRepository.GetSingleByIdAsync(projectId);

                if (project == null)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error("Project not found", $"Project with project id {projectId}")
                    );
                }
                _mapper.Map(updateProjectDTO, project);

                //await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                //await _unitOfWork.SaveChangesAsync();
                await _projectRepository.UpdateAsync(project);

                return Result.Success(_mapper.Map<ProjectDTO>(project));
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDTO>(
                    new Error("Update project failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<ProjectDTO>> VerifyProjectAsync(VerrifiedProjectDTO verrified)
        {
            try
            {
                //var queryOptions = new QueryBuilder<Project>()
                //    .WithTracking(true)
                //    .WithPredicate(a => a.ProjectId == verrified.ProjectId) // Filter by ID
                //    .Build();
                //var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                var project = await _projectRepository.GetSingleByIdAsync(verrified.ProjectId);

                if (project == null)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error(
                            "Project not found",
                            $"Project with project id {verrified.ProjectId}"
                        )
                    );
                }
                if (verrified.IsVerified)
                {
                    project.PostDate = DateTime.UtcNow;
                    project.Status = ProjectStatus.Verified;
                    project.VerifyStaffId = _currentUserService.AccountId;

                    //await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                    //await _unitOfWork.SaveChangesAsync();
                    await _projectRepository.UpdateAsync(project);
                }
                else
                {
                    project.Status = ProjectStatus.ReVerify;
                    project.VerifyStaffId = _currentUserService.AccountId;

                    //await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                    //await _unitOfWork.SaveChangesAsync();
                    await _projectRepository.UpdateAsync(project);
                }

                return Result.Success(_mapper.Map<ProjectDTO>(project));
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDTO>(
                    new Error("Verify project failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<ProjectDTO>> ChooseFreelancerAsync(
            long projectId,
            long freelancerId
        )
        {
            try
            {
                //var queryOptions = new QueryBuilder<Project>()
                //    .WithTracking(true)
                //    .WithPredicate(a => a.ProjectId == projectId) // Filter by ID
                //    .Build();
                //var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                var project = await _projectRepository.GetSingleByIdAsync(projectId);

                if (project == null)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error("Project not found", $"Project with project id {projectId}")
                    );
                }
                if (project.Status != ProjectStatus.Verified)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error("Choose freelancer failed", $"Project with project id {projectId} is not Verified")
                    );
                }

                //var freelancer = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>
                //{
                //    Predicate = a => a.AccountId == freelancerId && a.Role == AccountRole.Freelancer && a.Status == AccountStatus.Active
                //});
                var freelancer = _accountRepository.GetFreelancerByAccountIdAsync(projectId);

                if (freelancer == null)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error("Freelancer not found", $"Freelancer with account id {freelancerId} is not found or banned")
                    );
                }
                project.Status = ProjectStatus.OnGoing;
                project.FreelancerId = freelancerId;

                //await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                //await _unitOfWork.SaveChangesAsync();
                await _projectRepository.UpdateAsync(project);

                return Result.Success(_mapper.Map<ProjectDTO>(project));
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDTO>(
                    new Error("Choose freelancer failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<PaginatedResult<ProjectDTO>>> GetAllProjectsPendingAsync(
            int pageNumber,
            int pageSize
        )
        {
            try
            {
                //var queryOptions = new QueryBuilder<Project>()
                //    .WithTracking(false) // No tracking for efficient
                //    .WithInclude(p => p.SkillRequired)
                //    .WithInclude(p => p.Bids)
                //    .WithInclude(p => p.Milestones)
                //    .WithPredicate(p =>
                //        (p.Status == ProjectStatus.Pending)
                //        && p.Milestones.Any()
                //        && p.SkillRequired.Any()
                //    )
                //    .WithOrderBy(q => q.OrderByDescending(p => p.PostDate))
                //    .Build();
                //var query = _unitOfWork.GetRepo<Project>().Get(queryOptions);
                var query = _projectRepository.GetAllProjectsPendingPaging();
                
                var paginatedProjects = await Pagination.ApplyPaginationAsync(
                    query,
                    pageNumber,
                    pageSize,
                    _mapper.Map<ProjectDTO>
                );
                return Result.Success(paginatedProjects);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<ProjectDTO>>(
                    new Error("Get all projects failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<IEnumerable<ProjectDTO>>> GetAllProjectsAsync()
        {
            try
            {
                //var queryOptions = new QueryBuilder<Project>()
                //    .WithTracking(false) // No tracking for efficient
                //    .WithInclude(p => p.SkillRequired)
                //    .WithInclude(p => p.Milestones)
                //    .WithInclude(p => p.Bids)
                //    .WithOrderBy(q => q.OrderByDescending(p => p.PostDate))
                //    .Build();
                //var projects = await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
                var projects = await _projectRepository.GetAllProjectsAsync();

                //var accounts = await _unitOfWork.GetRepo<Account>().GetAllAsync(queryOptions);

                return Result.Success(_mapper.Map<IEnumerable<ProjectDTO>>(projects));
                //return Result.Success(projects.Select(p => p.ToProjectDTO()));
                //return Result.Success(projects);
            }
            catch (Exception e)
            {
                return Result.Failure<IEnumerable<ProjectDTO>>(
                    new Error("Get all projects failed", $"{e.Message}")
                );
            }
        }
    }
}
