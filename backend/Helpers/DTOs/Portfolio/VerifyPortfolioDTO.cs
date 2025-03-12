using System.ComponentModel.DataAnnotations;
using BusinessObjects.Enums;
using Helpers.HelperClasses;

namespace Helpers.DTOs.Portfolio
{
    public class VerifyPortfolioDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Portfolio status")]
        public PortfolioStatus Status { get; set; }
    }
}