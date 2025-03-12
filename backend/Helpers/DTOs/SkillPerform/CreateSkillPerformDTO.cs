using System.ComponentModel.DataAnnotations;
using BusinessObjects.Enums;
using Helpers.HelperClasses;

namespace Helpers.DTOs.SkillPerform
{
    public class CreateSkillPerformDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Skill ID")]
        public long SkillId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Level")]
        public SkillLevel Level { get; set; } = SkillLevel.Entry;
    }

}
