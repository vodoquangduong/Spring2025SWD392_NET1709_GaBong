using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Report
{
    public class CreateReportDTO
    {
        [Required(ErrorMessage = "Project ID is required")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = "Reason is required")]
        public string Reason { get; set; } = string.Empty;
    }
}