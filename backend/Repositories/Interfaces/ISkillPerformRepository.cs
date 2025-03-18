using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface ISkillPerformRepository
    {
        Task CreateAllAsync(List<SkillPerform> skillPerforms);
        Task<IEnumerable<SkillPerform>> GetAllByAccountIdAsync(long accountId);
        Task<IEnumerable<SkillPerform>> GetAllByAccountIdAsync(List<long> accountIds);
        Task DeleteAllAsync(List<SkillPerform> skillsToDelete);
        Task UpdateAsync(SkillPerform skillPerform);
    }
}
