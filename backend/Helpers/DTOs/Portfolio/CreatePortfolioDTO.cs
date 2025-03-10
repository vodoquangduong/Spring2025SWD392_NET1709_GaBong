using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using Helpers.DTOs.SkillPerform;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Portfolio
{
    public class CreatePortfolioDTO
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;
        [Required(ErrorMessage = "Works is required")]
        [StringLength(50, ErrorMessage = "Works must be less than 50 characters")]
        public string Works { get; set; } = string.Empty;
        [Required(ErrorMessage = "Certificate is required")]
        [StringLength(50, ErrorMessage = "Certificate must be less than 50 characters")]
        public string Certificate { get; set; } = string.Empty;
        [Required(ErrorMessage = "About is required")]
        [StringLength(500, ErrorMessage = "About must be less than 500 characters")]
        public string About { get; set; } = string.Empty;
        [Required(ErrorMessage = "Skill performs are required")]
        public List<CreateSkillPerformDTO> skillPerforms { get; set; } = new List<CreateSkillPerformDTO>();
    }
}