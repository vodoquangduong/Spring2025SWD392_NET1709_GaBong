using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;

namespace Helpers.Mappers
{
    public static class SkillCategoryMapper
    {
        public static SkillCategoryDTO ToSkillCategoryDTO(this SkillCategory skillCategory)
        {
            if (skillCategory == null) return null;

            return new SkillCategoryDTO
            {
                SkillId = skillCategory.SkillId,
                SkillName = skillCategory.SkillName,
            };
        }

        public static SkillCategory ToSkillCategory(SkillCategoryDTO skillCategoryDTO)
        {
            if (skillCategoryDTO == null) return null;
            SkillCategory skillCategory = new SkillCategory { 
                SkillName = skillCategoryDTO.SkillName 
            };
            return skillCategory;
        }
    }
}
