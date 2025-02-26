using BusinessObjects.Models;
using Helpers.DTOs.Project;
using Helpers.HelperClasses;
namespace Services.Interfaces
{
    public interface IProjectService
    {
        Task<Result<IEnumerable<ProjectDTO>>> GetAllProjectsAsync();
        Task<ProjectDTO> GetProjectByIdAsync(long id);
        Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO projectDto);
        Task<Project> UpdateProjectAsync(Project project);
        Task<bool> DeleteProjectAsync(long id);
        Task<Result<Project>> VerifyProjectAsync(long projectId, long staffId);
    }
}