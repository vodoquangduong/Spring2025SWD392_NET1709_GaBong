using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Bid
{
    public class CreateBidDTO
    {
        [Required]
        public long ProjectId { get; set; }
        public string BidDescription { get; set; } = string.Empty;
        [Required]
        public long Amount { get; set; }
    }
}