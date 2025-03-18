using BusinessObjects.Models;
using Helpers.DTOs.Query;

namespace Repositories.Interfaces
{
    public interface IProjectRepository
    {
        Task<Project?> GetSingleByIdAsync(long projectId);
        Task<Project?> GetSingleCompletedAsync(long projectId);
        Task<Project?> GetProjectWithSkillMilestoneBidAsync(long projectId);
        //Task<IEnumerable<Project>> GetAllAsync(QueryOptions<Project> queryOptions);
        Task<Project> CreateAsync(Project project);
        Task UpdateAsync(Project project);
        //Task<IEnumerable<SkillPerform>> GetUserSkillPerformAsync(long accountId);
        Task<IEnumerable<Project>> GetAllProjectsAsync();
        IQueryable<Project> GetAllProjectsVerifiedPaging(ProjectFilter filter);
        IQueryable<Project> GetAllProjectsPendingPaging();
    }
}
