using BusinessObjects.Enums;
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
        public AccountRole Role { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;

        public string AvatarURL { get; set; } = string.Empty;

        public DateTime Birthday { get; set; } = DateTime.MinValue;
        public Gender Gender { get; set; }
        public string Nationality { get; set; } = string.Empty;
        public int ReputationPoint { get; set; } = 0;

        public decimal TotalCredit { get; set; } = 0;

        public decimal LockCredit { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.MinValue;
        public AccountStatus Status { get; set; }
    }
}
