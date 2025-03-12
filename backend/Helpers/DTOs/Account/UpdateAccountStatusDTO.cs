using System.ComponentModel.DataAnnotations;
using Helpers.HelperClasses;

namespace Helpers.DTOs.Account
{
    public class UpdateAccountStatusDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Account ID")]
        public long AccountId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Status")]
        public string Status { get; set; } = string.Empty;
    }
}