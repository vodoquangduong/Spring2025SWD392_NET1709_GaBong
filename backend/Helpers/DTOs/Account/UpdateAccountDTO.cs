using BusinessObjects.Enums;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;
namespace Helpers.DTOs.Account
{
    public class UpdateAccountDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Name")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Phone")]
        [RegularExpression(@"^(\+\d{1,3}[- ]?)?\d{10}$", ErrorMessage = "Please enter a valid phone number. It should be 10 digits and may include a country code.")]
        public string Phone { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Address")]
        public string Address { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Avatar")]
        public string AvatarURL { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Birthday")]
        public DateTime Birthday { get; set; } = DateTime.MinValue;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Nationality")]
        public string Nationality { get; set; } = string.Empty;
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Gender")]
        public Gender Gender { get; set; }
    }
}