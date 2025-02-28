using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Transaction
{
    public class CreateTransactionDTO
    {
        public long AccountId { get; set; }
        public decimal Amount { get; set; }
        public TransactionStatus Status { get; set; }
        public TransactionType Type { get; set; }
    }
}