using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Milestone
{
    public class CreateMilestoneDTO
    {
        public string MilestoneName { get; set; } = string.Empty;
        public long ProjectId { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}