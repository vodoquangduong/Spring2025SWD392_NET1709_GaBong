using BusinessObjects.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Milestone
{
    public class FinishMilestoneDTO
    {
        public long milestoneId {  get; set; }
        public MilestoneStatus milestoneStatus { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
