using Helpers.DTOs.SkillPerform;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Portfolio
{
    public class CreatePortfolioDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Title")]
        public string Title { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Works")]
        //[StringLength(50, ErrorMessage = ValidationMessage.MaxLength)]
        public string Works { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Certificate")]
        //[StringLength(50, ErrorMessage = ValidationMessage.MaxLength)]
        public string Certificate { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "About")]
        [StringLength(500, ErrorMessage = ValidationMessage.MaxLength)]
        public string About { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Skill performs")]
        public List<CreateSkillPerformDTO> SkillPerforms { get; set; } = new List<CreateSkillPerformDTO>();
    }
}