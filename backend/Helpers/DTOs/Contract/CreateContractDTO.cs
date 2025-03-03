using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Contract
{
    public class CreateContractDTO
    {
        public long ProjectId { get; set; }
        public long freelancerId { get; set; }
        public string ContractPolicy { get; set; } = string.Empty;
    }
}