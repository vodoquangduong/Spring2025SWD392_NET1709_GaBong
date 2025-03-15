using System.ComponentModel.DataAnnotations;
using Helpers.HelperClasses;

namespace Helpers.DTOs.Project
{
    public class VerrifiedProjectDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Project ID")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Is verified")]
        public bool IsVerified { get; set; }
    }
}
