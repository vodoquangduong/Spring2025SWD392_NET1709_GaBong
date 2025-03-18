using BusinessObjects.Enums;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Portfolio
{
    public class VerifyPortfolioDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Portfolio status")]
        public PortfolioStatus Status { get; set; }
    }
}