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
        [Required(ErrorMessage = "Project ID is required")]
        public long ProjectId { get; set; } = long.MinValue;
       
        [Required(ErrorMessage = "Bid offer is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Bid offer must be a positive number")]
        public decimal BidOffer { get; set; } = 0;

        [Required(ErrorMessage = "Bid description is required")]
        public string BidDescription { get; set; } = string.Empty;
    }
}
