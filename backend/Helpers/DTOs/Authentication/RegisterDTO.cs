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
        public string Phone { get; set; } = "";

        [Required]
        public string Address { get; set; } = "";

        [Required]
        public string Email { get; set; } = "";

        [Required]
        public string Password { get; set; } = "";

        [Required]
        public DateTime Birthday { get; set; }

        [Required]
        [EnumDataType(typeof(Gender))]
        public Gender Gender { get; set; } = Gender.Other;

        [Required]
        [EnumDataType(typeof(AccountRole))]
        public AccountRole Role { get; set; } = AccountRole.Client;
    }
}
