using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Bid
{
    public class BidDTO
    {
        public long BidId { get; set; }
        public long BidOwnerId { get; set; }
        public long ProjectId { get; set; }
        public string BidDescription { get; set; } = string.Empty;
        public long Amount { get; set; }
        public string CreatedAt { get; set; } = string.Empty;
        
    }
}