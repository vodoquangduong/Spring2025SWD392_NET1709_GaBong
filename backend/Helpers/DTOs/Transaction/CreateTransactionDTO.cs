using System.ComponentModel.DataAnnotations;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Transaction
{
    public class CreateTransactionDTO
    {
        [Required(ErrorMessage = "Account ID is required")]
        public long AccountId { get; set; }
        [Required(ErrorMessage = "Amount is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Amount must be a positive number")]
        public decimal Amount { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public TransactionStatus Status { get; set; }
        [Required(ErrorMessage = "Type is required")]
        public TransactionType Type { get; set; }
    }
}