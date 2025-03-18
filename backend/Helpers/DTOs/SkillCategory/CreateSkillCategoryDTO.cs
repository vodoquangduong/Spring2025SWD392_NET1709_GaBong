using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.SkillCategory
{
    public class CreateSkillCategoryDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Skill name")]
        public string SkillName { get; set; } = string.Empty;

    }
}
