using System.ComponentModel.DataAnnotations;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Portfolio
{
    public class VerifyPortfolioDTO
    {
        [Required(ErrorMessage = "Portfolio status is required")]
        public PortfolioStatus Status { get; set; }
    }
}