using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ISkillCategoryService
    {

        Task<IEnumerable<SkillCategory>> GetAllSkillCategoryAsync();
        Task<List<SkillCategoryDTO>> GetSkillCategoryByIdAsync(long id);
        Task<SkillCategoryDTO> CreateSkillCategoryAsync(CreateSkillCategoryDTO createskillDTO);
        Task DeleteSkillCategoryAsync(long id);

    }
}