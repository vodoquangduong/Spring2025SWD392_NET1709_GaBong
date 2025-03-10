using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Project
{
    public class ChooseFreelancerDTO
    {
        [Required(ErrorMessage = "Project ID is required")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = "Freelancer ID is required")]
        public long FreelancerId { get; set; }
        
    }
}
