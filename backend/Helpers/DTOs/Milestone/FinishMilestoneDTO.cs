using BusinessObjects.Enums;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Milestone
{
    public class FinishMilestoneDTO
    {
        [Required(ErrorMessage = "Milestone ID is required")]
        public long milestoneId {  get; set; }
        [Required(ErrorMessage = "Milestone status is required")]
        public MilestoneStatus milestoneStatus { get; set; }
        [Required(ErrorMessage = "Update date is required")]
        public DateTime UpdateDate { get; set; }
    }
}
