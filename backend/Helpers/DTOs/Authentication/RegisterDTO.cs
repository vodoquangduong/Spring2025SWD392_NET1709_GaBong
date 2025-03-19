using BusinessObjects.Enums;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Authentication
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = "";

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = "";
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = "";

        [Required(ErrorMessage = "Status is required")]
        [EnumDataType(typeof(AccountStatus))]
        public AccountStatus Status { get; set; } = AccountStatus.Active;
        [Required(ErrorMessage = "Role is required")]
        [EnumDataType(typeof(AccountRole))]
        public AccountRole Role { get; set; } = AccountRole.Client;
    }
}
