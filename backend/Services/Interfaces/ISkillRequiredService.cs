using BusinessObjects.Models;

namespace Services.Interfaces
{
    public interface ISkillRequiredService
    {
        Task<List<SkillCategory>> GetSkillByProjectIdAsync(long id);

    }
}
