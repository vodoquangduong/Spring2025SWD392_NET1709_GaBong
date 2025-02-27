using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Project;
using Helpers.HelperClasses;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public ProjectService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO projectDto)
        {
            try
            {
                if (projectDto.EstimateBudget <= 0)
                {
                    return Result.Failure<ProjectDTO>(new Error("Create project failed", "Estimate budget must be greater than 0"));
                }
                var project = new Project()
                {
                    ClientId = _currentUserService.AccountId,
                    ProjectName = projectDto.ProjectName,
                    ProjectDescription = projectDto.ProjectDescription,
                    AvailableTimeRange = projectDto.AvailableTimeRange,
                    EstimateBudget = projectDto.EstimateBudget,
                    Status = ProjectStatus.Pending,
                    SkillRequired = projectDto.SkillIds.Select(skillId => new SkillRequired
                    {
                        SkillId = skillId
                    }).ToList()
                };
                var createProject = await _unitOfWork.GetRepo<Project>().CreateAsync(project);
                await _unitOfWork.SaveChangesAsync();
                return createProject.ToProjectDTO();
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDTO>(new Error("Create project failed", $"{e.Message}"));
            }
        }

        public Task<bool> DeleteProjectAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<object> GetAllProjectsVerifiedAsync(int pageNumber, int pageSize)
        {

            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(false) // No tracking for efficient
            .WithInclude(p => p.SkillRequired)
            .WithPredicate(p => p.Status == ProjectStatus.Verified)
            .WithOrderBy(q => q.OrderByDescending(p => p.PostDate))
            .Build();

            var query = _unitOfWork.GetRepo<Project>().Get(queryOptions);
            Console.WriteLine($"Total records before pagination: {query}");
            var paginatedProjects = await Pagination.ApplyPaginationAsync(query, pageNumber, pageSize);
            Console.WriteLine($"PageNumber: {pageNumber}, PageSize: {pageSize}");
            Console.WriteLine($"Records after pagination: {paginatedProjects.Items}");
            var projectDTOs = paginatedProjects.Items
                                                .Select(project => project.ToProjectDTO())
                                                .ToList();

            return new
            {
                Items = projectDTOs,
                TotalCount = paginatedProjects.TotalCount,
                PageNumber = paginatedProjects.PageNumber,
                PageSize = paginatedProjects.PageSize,
                TotalPages = paginatedProjects.TotalPages
            };
        }

        public async Task<Result<ProjectDTO>> GetProjectByIdAsync(long projectId)
        {
            try
            {
                var queryOptions = new QueryBuilder<Project>()
                            .WithTracking(false) // No tracking for efficient
                            .WithPredicate(project => project.ProjectId == projectId)
                            .Build();

                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                return Result.Success(project.ToProjectDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDTO>(new Error("Get project failed", $"{e.Message}"));
            }
        }

        public Task<Result<ProjectDTO>> UpdateProjectAsync(Project project)
        {
            throw new NotImplementedException();
        }

        public async Task<Project> VerifyProjectAsync(long projectId, long staffId)
        {
            Console.WriteLine($"Verifying project with ID: {projectId}");

            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(true)
            .WithPredicate(a => a.ProjectId == projectId) // Filter by ID
            .Build();

            var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
            if (project == null)
            {
                throw new KeyNotFoundException("Project not found");
            }

            project.PostDate = DateTime.UtcNow;
            project.Status = ProjectStatus.Verified;
            project.VerifyStaffId = staffId;

            await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
            await _unitOfWork.SaveChangesAsync();

            return project;
        }

        public async Task<Project> ChooseFreelancerAsync(long projectId, long freelancerId)
        {
            Console.WriteLine($"Verifying project with ID: {projectId}");

            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(true)
            .WithPredicate(a => a.ProjectId == projectId) // Filter by ID
            .Build();
            
            var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
            if (project == null)
            {
                return Result.Failure<ProjectDTO>(new Error("Project not found", $"Project with project id {projectId}"));
            }

            project.PostDate = DateTime.UtcNow;
            project.Status = ProjectStatus.Verified;
            project.VerifyStaffId = _currentUserService.AccountId;

            await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
            await _unitOfWork.SaveChangesAsync();

            return project.ToProjectDTO();
        }

        public async Task<Result<ProjectDTO>> ChooseFreelancerAsync(long projectId, long freelancerId)
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
                    return Result.Failure<ProjectDTO>(new Error("Project not found", $"Project with project id {projectId}"));
                }
                project.Status = ProjectStatus.OnGoing;
                project.FreelancerId = freelancerId;
                await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                await _unitOfWork.SaveChangesAsync();
                return project.ToProjectDTO();
            }
            catch (Exception e)
            {
                return Result.Failure<ProjectDTO>(new Error("Choose freelancer failed", $"{e.Message}"));
            }
        }
    }
}