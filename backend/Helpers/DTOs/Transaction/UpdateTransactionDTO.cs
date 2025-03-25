using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using BusinessObjects.Enums;
using Helpers.HelperClasses;

namespace Helpers.DTOs.Transaction
{
    public class UpdateTransactionDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Transaction ID")]
        public long TransactionId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Status")]
        public BusinessObjects.Enums.TransactionStatus Status { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Details")]
        public string Details { get; set; }
    }
}