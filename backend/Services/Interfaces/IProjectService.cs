using BusinessObjects.Models;
using Helpers.DTOs.Project;
using Helpers.HelperClasses;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Services.Interfaces
{
    public interface IProjectService
    {
        Task<object> GetAllProjectsVerifiedAsync(int pageNumber, int pageSize);
        Task<ProjectDTO> GetProjectByIdAsync(long id);
        Task<Project> CreateProjectAsync(CreateProjectDTO projectDto);
        Task<Project> UpdateProjectAsync(Project project);
        Task<bool> DeleteProjectAsync(long id);
        Task<Result<ProjectDTO>> VerifyProjectAsync(long projectId);
        Task<Result<ProjectDTO>> ChooseFreelancerAsync(long projectId, long freelancerId);
    }
}