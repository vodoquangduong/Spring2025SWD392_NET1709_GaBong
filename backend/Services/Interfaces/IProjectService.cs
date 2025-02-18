using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs.Project;

namespace Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDTO>> GetAllProjectsAsync();
        // Task<ProjectDTO> GetProjectByIdAsync(long id);
        Task<ProjectDTO> CreateProjectAsync(CreateProjectDTO projectDto, long userId);
        // Task<Project> UpdateProjectAsync(Project project);
        // Task<bool> DeleteProjectAsync(long id);
    }
}