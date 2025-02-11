using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Account
{
    public class AccountDTO
    {
        public long AccountId { get; set; }
        public string Role { get; set; } = String.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime Birthday { get; set; } = DateTime.MinValue;
        public string Gender { get; set; } = String.Empty;
        public int ReputationPoint { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.MinValue;
        public string Status { get; set; } = String.Empty;

    }
}
