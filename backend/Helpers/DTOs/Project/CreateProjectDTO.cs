
using System.ComponentModel.DataAnnotations;


namespace Helpers.DTOs.Project
{
    public class CreateProjectDTO
    {
        [Required]
        public string ProjectName { get; set; } = string.Empty;

        [Required]
        public string ProjectDescription { get; set; } = string.Empty;

        [Required]
        public int AvailableTimeRange { get; set; }

        [Required]
        public decimal EstimateBudget { get; set; }
        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public List<long> SkillIds { get; set; } = new List<long>();

    }
}