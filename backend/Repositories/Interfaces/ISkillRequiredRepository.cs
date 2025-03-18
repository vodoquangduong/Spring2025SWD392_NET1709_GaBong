using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface ISkillRequiredRepository
    {
        Task<IEnumerable<SkillRequired>> GetSkillByProjectIdAsync(long projectId);
        Task CreateAllAsync(List<SkillRequired> skillRequireds);
    }

}
