using Helpers.DTOs.Project;
using Helpers.DTOs.Query;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IProjectService
    {
        Task<Result<IEnumerable<ProjectDTO>>> GetAllProjectsAsync();
        Task<Result<PaginatedResult<ProjectDTO>>> GetAllProjectsVerifiedAsync(int pageNumber, int pageSize, ProjectFilter filter);
        Task<Result<PaginatedResult<ProjectDTO>>> GetAllProjectsPendingAsync(int pageNumber, int pageSize);
        Task<Result<ProjectDTO>> GetProjectByIdAsync(long id);
        Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO projectDto);
        Task<Result<ProjectDTO>> UpdateProjectAsync(UpdateProjectDTO project, long projectId);
        Task<Result<ProjectDTO>> VerifyProjectAsync(VerrifiedProjectDTO verify);
        Task<Result<ProjectDTO>> ChooseFreelancerAsync(long projectId, long freelancerId);
    }

}