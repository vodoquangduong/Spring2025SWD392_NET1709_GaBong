using Helpers.DTOs.SkillPerform;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Portfolio
{
    public class UpdatePortfolioDTO
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(50, ErrorMessage = "Title must be less than 50 characters")]
        public string Title { get; set; } = string.Empty;
        [Required(ErrorMessage = "Works is required")]
        public string Works { get; set; } = string.Empty;
        [Required(ErrorMessage = "Certificate is required")]
        public string Certificate { get; set; } = string.Empty;
        [Required(ErrorMessage = "About is required")]
        [StringLength(500, ErrorMessage = "About must be less than 500 characters")]
        public string About { get; set; } = string.Empty;
        public List<CreateSkillPerformDTO> SkillPerforms { get; set; } = new List<CreateSkillPerformDTO>();

    }
}