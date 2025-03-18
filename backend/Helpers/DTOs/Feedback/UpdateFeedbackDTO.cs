using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;
namespace Helpers.DTOs.Feedback
{
    public class UpdateFeedbackDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project ID")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Rating")]
        public int Rating { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Comment")]
        public string FeedbackComment { get; set; } = string.Empty;
    }
}