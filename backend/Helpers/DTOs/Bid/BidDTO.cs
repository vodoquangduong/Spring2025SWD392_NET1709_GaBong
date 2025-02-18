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
        public long FreelancerId { get; set; }
        public long VerifyStaffId { get; set; }
        public DateTime PostDate { get; set; }
        
    }
}