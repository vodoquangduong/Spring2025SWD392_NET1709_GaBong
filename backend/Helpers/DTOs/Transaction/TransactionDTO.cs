using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Transaction
{
    public class TransactionDTO
    {
        public long TransactionId { get; set; }
        public long AccountId { get; set; }
        public string CreatedAt { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Detail { get; set; }
        public TransactionStatus Status { get; set; }
        public TransactionType Type { get; set; }
    }
}