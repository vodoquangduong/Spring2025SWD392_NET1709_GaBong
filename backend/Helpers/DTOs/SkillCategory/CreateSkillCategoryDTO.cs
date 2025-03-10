using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.SkillCategory
{
    public class CreateSkillCategoryDTO
    {
        [Required(ErrorMessage = "Skill name is required")]
        public string SkillName { get; set; } = string.Empty;

    }
}
