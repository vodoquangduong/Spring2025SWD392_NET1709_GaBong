using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Account
{
    public class UpdateAccountStatusDTO
    {
        [Required]
        public long AccountId { get; set; }
        [Required]
        public string Status { get; set; } = string.Empty;
    }
}