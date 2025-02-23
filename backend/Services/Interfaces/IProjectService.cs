using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs.Project;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync();
        Task<ProjectDTO> GetProjectByIdAsync(long id);
        Task<Project> CreateProjectAsync(CreateProjectDTO projectDto);
        Task<Project> UpdateProjectAsync(Project project);
        Task<bool> DeleteProjectAsync(long id);
        Task<Project> VerifyProjectAsync(long projectId, long staffId);
    }
}