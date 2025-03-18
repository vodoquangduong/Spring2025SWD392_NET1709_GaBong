using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface IMilestoneRepository
    {
        Task<Milestone?> GetSingleByIdAsync(long milestoneId);
        Task<IEnumerable<Milestone>> GetSingleByProjectIdAsync(long projectId);
        Task<IEnumerable<Milestone>> GetAllMilestonesAsync();
        Task<Milestone> CreateMilestoneAsync(Milestone milestone);
        Task UpdateMilestoneAsync(Milestone milestone);
        Task CreateAllAsync(List<Milestone> milestones);
    }
}
