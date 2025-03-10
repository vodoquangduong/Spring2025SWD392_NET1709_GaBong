using BusinessObjects.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Milestone
{
    public class CreateMilestoneWithProjectDTO
    {
        [Required(ErrorMessage = "Milestone name is required")]
        public string MilestoneName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Deadline is required")]
        public DateTime Deadline { get; set; }
        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; } = string.Empty;
        [Required(ErrorMessage = "Amount is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Amount must be a positive number")]
        public decimal Amount { get; set; }
    }
}
