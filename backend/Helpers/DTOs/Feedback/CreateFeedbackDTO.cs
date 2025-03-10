using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Feedback
{
    public class CreateFeedbackDTO
    {
        [Required(ErrorMessage = "Project ID is required")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = "Rating is required")]
        public int Rating { get; set; }
        [Required(ErrorMessage = "Comment is required")]
        public string Comment { get; set; } = string.Empty;
    }
}