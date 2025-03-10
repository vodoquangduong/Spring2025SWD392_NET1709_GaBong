using BusinessObjects.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Authentication
{
    public class RegisterDTO
    {
        [Required]
        public string Name { get; set; } = "";

       
        [Required]
        public string Email { get; set; } = "";

        [Required]
        public string Password { get; set; } = "";
        [Required]
        [EnumDataType(typeof(AccountStatus))]
        public AccountStatus Status { get; set; } = AccountStatus.Active;

        [Required]
        [EnumDataType(typeof(AccountRole))]
        public AccountRole Role { get; set; } = AccountRole.Client;
    }
}
