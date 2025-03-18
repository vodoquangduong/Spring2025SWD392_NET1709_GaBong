using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface ISkillCategoryRepository
    {
        Task<SkillCategory?> GetSingleByIdAsync(long skillId);
        Task<SkillCategory?> GetSingleBySkillNameAsync(string skillName);
        Task<SkillCategory> CreateAsync(SkillCategory skillCategory);
        Task<IEnumerable<SkillCategory>> GetAllBySkillIdAsync(long skillId);
        Task<IEnumerable<SkillCategory>> GetAll();
    }
}
