using Helpers.DTOs.Milestone;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Project
{
    public class CreateProjectDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project name")]
        public string ProjectName { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project description")]
        public string ProjectDescription { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Available time range")]
        public int AvailableTimeRange { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Range(0, double.MaxValue, ErrorMessage = ValidationMessage.BudgetRange)]
        [Display(Name = "Estimate budget")]
        public decimal EstimateBudget { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Location")]
        public string Location { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Skill IDs")]
        public List<long> SkillIds { get; set; } = new List<long>();
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Milestones")]
        public List<CreateMilestoneWithProjectDTO> Milestones { get; set; } = new List<CreateMilestoneWithProjectDTO> { };

    }
}