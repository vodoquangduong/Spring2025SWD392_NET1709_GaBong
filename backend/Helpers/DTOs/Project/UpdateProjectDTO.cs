using BusinessObjects.Enums;
using Helpers.DTOs.Bid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Project
{
    public class UpdateProjectDTO
    {
        public int AvailableTimeRange { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public string ProjectDescription { get; set; } = string.Empty;
        public decimal EstimateBudget { get; set; }
        public string Location { get; set; } = string.Empty;

        public ProjectStatus Status { get; set; }

        public List<long> SkillIds { get; set; } = new List<long>();
    }
}
