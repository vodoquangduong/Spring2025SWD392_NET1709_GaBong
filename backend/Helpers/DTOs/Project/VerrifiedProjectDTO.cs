using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Project
{
    public class VerrifiedProjectDTO
    {
        [Required(ErrorMessage = "Project ID is required")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = "Is verified is required")]
        public bool IsVerified { get; set; }
    }
}
