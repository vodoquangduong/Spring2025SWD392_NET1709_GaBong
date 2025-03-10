using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Account
{
    public class UpdateAccountDTO
    {
        [Required(ErrorMessage = "Name can not be null")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage = "Phone can not be null")]
        [RegularExpression(@"^(\+\d{1,3}[- ]?)?\d{10}$", ErrorMessage = "Please enter a valid phone number. It should be 10 digits and may include a country code.")]
        public string Phone { get; set; } = string.Empty;
        [Required(ErrorMessage = "Address can not be null")]
        public string Address { get; set; } = string.Empty;
        [Required(ErrorMessage = "Avatar can not be null")]
        public string AvatarURL { get; set; } = string.Empty;
        [Required(ErrorMessage = "Birthday can not be null")]
        public DateTime Birthday { get; set; } = DateTime.MinValue;
        [Required(ErrorMessage = "Nationality can not be null")]
        public string Nationality { get; set; } = string.Empty;
        [Required(ErrorMessage = "Gender can not be null")]
        public Gender Gender { get; set; }
    }
}