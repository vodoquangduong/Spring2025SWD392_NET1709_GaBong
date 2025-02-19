using Helpers.DTOs.Project;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    internal interface IMilestoneService
    {
        Task<IEnumerable<ProjectDTO>> GetAllMilestoneAsync();
        //Task<MilestoneDTO> GetMilestoneByIdAsync(long id);
        // Task<MilestoneDTO> CreateMilestoneAsync(CreateProjectDTO projectDto, long userId);
        // Task<Project> UpdateProjectAsync(Project project);
        // Task<bool> DeleteProjectAsync(long id);
    }
}

