using BusinessObjects.Enums;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Project
{
    public class UpdateProjectDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Available time range")]
        public int AvailableTimeRange { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project name")]
        public string ProjectName { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project description")]
        public string ProjectDescription { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Range(0, double.MaxValue, ErrorMessage = ValidationMessage.BudgetRange)]
        [Display(Name = "Estimate budget")]
        public decimal EstimateBudget { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Location")]
        public string Location { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Status")]
        public ProjectStatus Status { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Skill IDs")]
        public List<long> SkillIds { get; set; } = new List<long>();
    }
}
