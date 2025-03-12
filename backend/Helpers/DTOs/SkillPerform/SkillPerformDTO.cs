using BusinessObjects.Enums;
using Helpers.DTOs.SkillCategory;

namespace Helpers.DTOs.SkillPerform
{
    public class SkillPerformDTO
    {
        public SkillCategoryDTO skills {  get; set; }
        public SkillLevel SkillLevel { get; set; }
    }
}
