using BusinessObjects.Enums;
using System.ComponentModel.DataAnnotations;


namespace Helpers.DTOs.Project
{
    public class UpdateProjectDTO
    {
        [Required(ErrorMessage = "Available time range is required")]
        public int AvailableTimeRange { get; set; }
        [Required(ErrorMessage = "Project name is required")]
        public string ProjectName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Project description is required")]
        public string ProjectDescription { get; set; } = string.Empty;
        [Required(ErrorMessage = "Estimate budget is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Estimate budget must be a positive number")]
        public decimal EstimateBudget { get; set; }
        [Required(ErrorMessage = "Location is required")]
        public string Location { get; set; } = string.Empty;
        [Required(ErrorMessage = "Status is required")]
        public ProjectStatus Status { get; set; }
        [Required(ErrorMessage = "Skill IDs are required")]
        public List<long> SkillIds { get; set; } = new List<long>();
    }
}
