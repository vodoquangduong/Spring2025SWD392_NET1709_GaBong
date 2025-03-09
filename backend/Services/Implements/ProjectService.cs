using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Helpers.DTOs.Milestone;
using Helpers.DTOs.Project;
using Helpers.DTOs.Query;
using Helpers.DTOs.Transaction;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Helpers.SignalR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using PayPalCheckoutSdk.Orders;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public ProjectService(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO projectDto)
        {
            try
            {
                //<==Get client account==>
                var queryOption = new QueryBuilder<Account>()
                    .WithTracking(false)
                    .WithPredicate(a => a.AccountId == _currentUserService.AccountId)
                    .Build();
                var client = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOption);

                //<==Create new project==>
                //<========Validation========>
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
                //<========Create========>
                var project = new Project()
                {
                    ClientId = client.AccountId,
                    ProjectName = projectDto.ProjectName,
                    ProjectDescription = projectDto.ProjectDescription,
                    AvailableTimeRange = projectDto.AvailableTimeRange,
                    EstimateBudget = projectDto.EstimateBudget,
                    Location = projectDto.Location,
                    Status = ProjectStatus.Pending,
                    SkillRequired = projectDto
                        .SkillIds.Select(skillId => new SkillRequired { SkillId = skillId })
                        .ToList(),
                };

                var createProject = await _unitOfWork.GetRepo<Project>().CreateAsync(project);
                await _unitOfWork.SaveChangesAsync();

                //<==Create Milestone==>
                var milestones = projectDto
                    .Milestones.Select(m => new Milestone
                    {
                        ProjectId = createProject.ProjectId,
                        MilestoneName = m.MilestoneName,
                        DeadlineDate = m.Deadline,
                        MilestoneDescription = m.Description,
                        PayAmount = m.Amount,
                        Status = MilestoneStatus.NotStarted,
                    })
                    .ToList();
                await _unitOfWork.GetRepo<Milestone>().CreateAllAsync(milestones);

                //<==Lock credit==>
                client.LockCredit += createProject.EstimateBudget;
                await _unitOfWork.GetRepo<Account>().UpdateAsync(client);

                //<==Save change==>
                await _unitOfWork.SaveChangesAsync();

                return Result.Success(createProject.ToProjectDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDTO>(
                    new Error("Create project failed", $"{e.Message}")
                );
            }
        }

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
                var queryOptions = new QueryBuilder<Project>()
                    .WithTracking(false) // No tracking for efficient
                    .WithInclude(p => p.SkillRequired)
                    .WithInclude(p => p.Milestones)
                    .WithInclude(p => p.Bids)
                    .WithPredicate(p =>
                        p.Status == ProjectStatus.Verified
                        && p.Milestones.Any()
                        && p.SkillRequired.Any()
                        && (
                            string.IsNullOrEmpty(filter.ProjectName)
                            || p.ProjectName.ToLower().Contains(filter.ProjectName.ToLower())
                        )
                        && (filter.MinBudget == null || p.EstimateBudget >= filter.MinBudget)
                        && (filter.MaxBudget == null || p.EstimateBudget <= filter.MaxBudget)
                        && (
                            filter.SkillIds == null
                            || filter.SkillIds.All(id => p.SkillRequired.Any(s => s.SkillId == id))
                        )
                        && (
                            string.IsNullOrEmpty(filter.Location)
                            || p.Location.Contains(filter.Location)
                        )
                    )
                    .WithOrderBy(q =>
                    {
                        switch (filter.SortBy)
                        {
                            case "newest":
                                return q.OrderByDescending(p => p.PostDate); // Newest
                            case "oldest":
                                return q.OrderBy(p => p.PostDate); // Oldest
                            case "highest_budget":
                                return q.OrderByDescending(p => p.EstimateBudget); // Max budget
                            case "lowest_budget":
                                return q.OrderBy(p => p.EstimateBudget); // Min budget
                            default:
                                return q.OrderByDescending(p => p.PostDate); // Default: newest
                        }
                    })
                    .Build();
                var query = _unitOfWork.GetRepo<Project>().Get(queryOptions);
                var paginatedProjects = await Pagination.ApplyPaginationAsync(
                    query,
                    pageNumber,
                    pageSize,
                    project => project.ToProjectDTO()
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
                var queryOptions = new QueryBuilder<Project>()
                    .WithTracking(false) // No tracking for efficient
                    .WithInclude(p => p.SkillRequired)
                    .WithInclude(p => p.Milestones)
                    .WithInclude(p => p.Bids)
                    .WithPredicate(project =>
                        project.ProjectId == projectId
                        && project.Milestones.Any()
                        && project.SkillRequired.Any()
                    )
                    .Build();

                var bidQueryOptions = new QueryBuilder<Bid>()
                    .WithTracking(false)
                    .WithInclude(b => b.BidOwner)
                    .WithPredicate(b => b.ProjectId == projectId)
                    .Build();

                var bids = await _unitOfWork.GetRepo<Bid>().GetAllAsync(bidQueryOptions);
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                var skillQuerry = new QueryBuilder<SkillRequired>()
                    .WithTracking(false)
                    .WithInclude(s => s.SkillCategory)
                    .WithPredicate(s => s.ProjectId == projectId)
                    .Build();
                var skill = await _unitOfWork.GetRepo<SkillRequired>().GetAllAsync(skillQuerry);

                if (project == null)
                {
                    return Result.Failure<ProjectDetailDTO>(
                        new Error("Get project failed", "Project not found")
                    );
                }
                var result = new ProjectDetailDTO()
                {
                    ProjectId = projectId,
                    ClientId = project.ClientId,
                    FreelancerId = project.FreelancerId,
                    VerifyStaffId = project.VerifyStaffId,
                    PostDate = project.PostDate.ToString("dd-MM-yyyy"),
                    AvailableTimeRange = project.AvailableTimeRange,
                    ProjectName = project.ProjectName,
                    ProjectDescription = project.ProjectDescription,
                    Location = project.Location,
                    EstimateBudget = project.EstimateBudget,
                    Status = project.Status,
                    Skills = skill.Select(s => s.SkillCategory.ToSkillCategoryDTO()).ToList(),
                    Milestones = (List<Milestone>)project.Milestones,
                    Bids = bids.Select(b => b.ToBidDTO()).ToList() ?? new List<BidDTO>(),
                };
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
                var queryOptions = new QueryBuilder<Project>()
                    .WithTracking(true)
                    .WithPredicate(a => a.ProjectId == projectId) // Filter by ID
                    .Build();

                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                if (project == null)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error("Project not found", $"Project with project id {projectId}")
                    );
                }
                project.ProjectName = updateProjectDTO.ProjectName;
                project.AvailableTimeRange = updateProjectDTO.AvailableTimeRange;
                project.Status = updateProjectDTO.Status;
                project.EstimateBudget = updateProjectDTO.EstimateBudget;
                project.Location = updateProjectDTO.Location;
                project.ProjectDescription = updateProjectDTO.ProjectDescription;

                await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(project.ToProjectDTO());
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
                var queryOptions = new QueryBuilder<Project>()
                    .WithTracking(true)
                    .WithPredicate(a => a.ProjectId == verrified.ProjectId) // Filter by ID
                    .Build();

                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
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
                    await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                    await _unitOfWork.SaveChangesAsync();
                }
                else
                {
                    project.Status = ProjectStatus.ReVerify;
                    project.VerifyStaffId = _currentUserService.AccountId;
                    await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                    await _unitOfWork.SaveChangesAsync();
                }

                return Result.Success(project.ToProjectDTO());
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
                Console.WriteLine($"Verifying project with ID: {projectId}");
                var queryOptions = new QueryBuilder<Project>()
                    .WithTracking(true)
                    .WithPredicate(a => a.ProjectId == projectId) // Filter by ID
                    .Build();
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                if (project == null)
                {
                    return Result.Failure<ProjectDTO>(
                        new Error("Project not found", $"Project with project id {projectId}")
                    );
                }
                project.Status = ProjectStatus.OnGoing;
                project.FreelancerId = freelancerId;
                await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                await _unitOfWork.SaveChangesAsync();
                return project.ToProjectDTO();
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
                var queryOptions = new QueryBuilder<Project>()
                    .WithTracking(false) // No tracking for efficient
                    .WithInclude(p => p.SkillRequired)
                    .WithInclude(p => p.Bids)
                    .WithInclude(p => p.Milestones)
                    .WithPredicate(p =>
                        (p.Status == ProjectStatus.Pending)
                        && p.Milestones.Any()
                        && p.SkillRequired.Any()
                    )
                    .WithOrderBy(q => q.OrderByDescending(p => p.PostDate))
                    .Build();
                var query = _unitOfWork.GetRepo<Project>().Get(queryOptions);
                var paginatedProjects = await Pagination.ApplyPaginationAsync(
                    query,
                    pageNumber,
                    pageSize,
                    project => project.ToProjectDTO()
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
                var queryOptions = new QueryBuilder<Project>()
                    .WithTracking(false) // No tracking for efficient
                    .WithInclude(p => p.SkillRequired)
                    .WithInclude(p => p.Milestones)
                    .WithInclude(p => p.Bids)
                    .WithOrderBy(q => q.OrderByDescending(p => p.PostDate))
                    .Build();
                var projects = await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
                //var accounts = await _unitOfWork.GetRepo<Account>().GetAllAsync(queryOptions);
                return Result.Success(projects.Select(p => p.ToProjectDTO()));
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
