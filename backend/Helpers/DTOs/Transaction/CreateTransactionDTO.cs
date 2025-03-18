using BusinessObjects.Enums;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Transaction
{
    public class CreateTransactionDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Account ID")]
        public long AccountId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Range(0, double.MaxValue, ErrorMessage = ValidationMessage.BudgetRange)]
        [Display(Name = "Amount")]
        public decimal Amount { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Status")]
        public TransactionStatus Status { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Type")]
        public TransactionType Type { get; set; }
    }
}