using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs.Transaction;

namespace Helpers.Mappers
{
    public static class TransactionMapper
    {
        public static TransactionDTO ToTransactionDTO(this Transaction transaction)
        {
            return new TransactionDTO
            {
                TransactionId = transaction.TransactionId,
                AccountId = transaction.AccountId,
                CreatedAt = transaction.CreatedAt.ToString("dd-MM-yyyy"),
                Amount = transaction.Amount,
                Status = transaction.Status,
                Type = transaction.Type
            };
        }
    }
}