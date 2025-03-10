using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Account
{
    public class UpdateAccountStatusDTO
    {
        [Required(ErrorMessage = "Account ID is required")]
        public long AccountId { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; } = string.Empty;
    }
}