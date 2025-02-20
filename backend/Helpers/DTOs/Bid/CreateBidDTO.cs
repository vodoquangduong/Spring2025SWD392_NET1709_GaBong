using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Bid
{
    public class CreateBidDTO
    {
        [Required]
        public long ProjectId { get; set; } = long.MinValue;
       
        [Required]
        public decimal BidOffer { get; set; } = 0;

        [Required]
        public string BidDescription { get; set; } = string.Empty;
    }
}
