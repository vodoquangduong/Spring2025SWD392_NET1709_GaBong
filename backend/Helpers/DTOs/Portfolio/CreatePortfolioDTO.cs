using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using Helpers.DTOs.SkillPerform;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Portfolio
{
    public class CreatePortfolioDTO
    {
        [Required]

        public string Title { get; set; } = string.Empty;
        [Required]

        public string Works { get; set; } = string.Empty;
        [Required]

        public string Certificate { get; set; } = string.Empty;
        [Required]

        public string About { get; set; } = string.Empty;
        [Required]
        public List<CreateSkillPerformDTO> skillPerforms { get; set; } = new List<CreateSkillPerformDTO>();
    }
}