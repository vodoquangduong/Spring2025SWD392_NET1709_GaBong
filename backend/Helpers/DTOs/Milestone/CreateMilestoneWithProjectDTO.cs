using BusinessObjects.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Milestone
{
    public class CreateMilestoneWithProjectDTO
    {
        public string MilestoneName { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}
