using BusinessObjects.Enums;
using Helpers.DTOs.SkillCategory;

namespace Helpers.DTOs.SkillPerform
{
    public class SkillPerformDTO
    {
        public SkillCategoryDTO Skills {  get; set; }
        public SkillLevel SkillLevel { get; set; }
    }
}
