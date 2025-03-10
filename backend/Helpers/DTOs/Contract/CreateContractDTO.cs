using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Contract
{
    public class CreateContractDTO
    {
        [Required(ErrorMessage = "Project ID is required")]
        public long ProjectId { get; set; }
        [Required(ErrorMessage = "Freelancer ID is required")]
        public long freelancerId { get; set; }
        [Required(ErrorMessage = "Contract policy is required")]
        public string ContractPolicy { get; set; } = string.Empty;
    }
}