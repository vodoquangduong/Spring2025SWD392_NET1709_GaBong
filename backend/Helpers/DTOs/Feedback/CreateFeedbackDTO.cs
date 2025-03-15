using System.ComponentModel.DataAnnotations;
using Helpers.HelperClasses;

namespace Helpers.DTOs.Feedback
{
    public class CreateFeedbackDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project ID")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Rating")]
        public int Rating { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Comment")]
        public string Comment { get; set; } = string.Empty;
    }
}