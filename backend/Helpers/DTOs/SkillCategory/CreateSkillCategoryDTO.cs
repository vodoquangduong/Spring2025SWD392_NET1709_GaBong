using System.ComponentModel.DataAnnotations;
using Helpers.HelperClasses;

namespace Helpers.DTOs.SkillCategory
{
    public class CreateSkillCategoryDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Skill name")]
        public string SkillName { get; set; } = string.Empty;

    }
}
