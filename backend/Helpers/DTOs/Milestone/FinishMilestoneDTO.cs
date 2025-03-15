using BusinessObjects.Enums;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Milestone
{
    public class FinishMilestoneDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Milestone ID")]
        public long milestoneId {  get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Milestone status")]
        public MilestoneStatus milestoneStatus { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Update date")]
        public DateTime UpdateDate { get; set; }
    }
}
