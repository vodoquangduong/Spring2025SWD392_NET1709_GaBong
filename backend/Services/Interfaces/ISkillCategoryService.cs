using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;

namespace Services.Interfaces
{
    public interface ISkillCategoryService
    {
        Task<IEnumerable<SkillCategory>> GetAllSkillCategoryAsync();
        Task<List<SkillCategoryDTO>> GetSkillCategoryByIdAsync(long id);
        Task<SkillCategoryDTO> CreateSkillCategoryAsync(CreateSkillCategoryDTO createskillDTO);
    }
}