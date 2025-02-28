using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Milestone
{
    public class MilestoneDTO
    {
        public long MilestoneId { get; set; }
        public string MilestoneName { get; set; } = string.Empty;
        public long ProjectId { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public MilestoneStatus Status { get; set; }
    }
}