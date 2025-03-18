using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Authentication
{
    public class LoginGoogleDTO
    {
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = string.Empty;
    }
}
