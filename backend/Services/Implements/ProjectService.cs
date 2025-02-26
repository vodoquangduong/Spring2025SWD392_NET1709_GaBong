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

        public async Task<Result<IEnumerable<ProjectDTO>>> GetAllProjectsAsync()
        {

            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(false) // No tracking for efficient
            .WithInclude(p => p.SkillRequired)
            .Build();
            var projects = await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
            return Result.Success(projects.Select(project => project.ToProjectDTO()));
        }



        public Task<ProjectDTO> GetProjectByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task<Project> UpdateProjectAsync(Project project)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<Project>> VerifyProjectAsync(long projectId, long staffId)
        {
            Console.WriteLine($"Verifying project with ID: {projectId}");

            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(true)
            .WithPredicate(a => a.ProjectId == projectId) // Filter by ID
            .Build();

            var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
            if (project == null)
            {
                return Result.Failure<Project>(new Error("Project not found", $"Project with project id {projectId}"));
            }

            project.PostDate = DateTime.UtcNow;
            project.Status = ProjectStatus.Verified;
            project.VerifyStaffId = staffId;

            await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
            await _unitOfWork.SaveChangesAsync();

            return Result.Success(project);
            }
    }
}