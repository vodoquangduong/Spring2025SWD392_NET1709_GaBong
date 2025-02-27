using BusinessObjects.Models;
using Helpers.DTOs.Project;
using Helpers.HelperClasses;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Services.Interfaces
{
    public interface IProjectService
    {
        Task<PaginatedResult<ProjectDTO>> GetAllProjectsAsync(int pageNumber, int pageSize);
        Task<Result<ProjectDTO>> GetProjectByIdAsync(long id);
        Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO projectDto);
        Task<Result<ProjectDTO>> UpdateProjectAsync(Project project);
        Task<bool> DeleteProjectAsync(long id);
        Task<Result<ProjectDTO>> VerifyProjectAsync(long projectId);
        Task<Result<ProjectDTO>> ChooseFreelancerAsync(long projectId, long freelancerId);
    }
}