using BusinessObjects.Enums;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Milestone
{
    public class UpdateMilestoneDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Milestone name")]
        public string MilestoneName { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Deadline")]
        public DateTime Deadline { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Description")]
        public string Description { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Range(0, double.MaxValue, ErrorMessage = "Amount must be a positive number")]
        public decimal Amount { get; set; }
        public MilestoneStatus Status { get; set; }
    }
}
