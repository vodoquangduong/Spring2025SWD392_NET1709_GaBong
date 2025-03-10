using System.ComponentModel.DataAnnotations;
namespace Helpers.DTOs.Feedback
{
    public class UpdateFeedbackDTO
    {
        [Required(ErrorMessage = "Project ID is required")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = "Rating is required")]
        public int Rating { get; set; }
        [Required(ErrorMessage = "Comment is required")]
        public string Comment { get; set; } = string.Empty;
    }
}