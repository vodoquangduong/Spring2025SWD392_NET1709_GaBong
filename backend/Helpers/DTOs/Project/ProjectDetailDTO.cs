using BusinessObjects.Enums;
using Helpers.DTOs.Bid;

using Helpers.DTOs.SkillCategory;

namespace Helpers.DTOs.Project
{
    public class ProjectDetailDTO
    {
        public long ProjectId { get; set; }
        public long ClientId { get; set; }
        public long? FreelancerId { get; set; }
        public long? VerifyStaffId { get; set; }
        public string PostDate { get; set; } = string.Empty;
        public int AvailableTimeRange { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public string ProjectDescription { get; set; } = string.Empty;
        public decimal EstimateBudget { get; set; }
        public string Location { get; set; } = string.Empty;
        public ProjectStatus Status { get; set; }
        public List<SkillCategoryDTO> Skills { get; set; } = new List<SkillCategoryDTO>();
        public List<BusinessObjects.Models.Milestone> Milestones { get; set; } = new List<BusinessObjects.Models.Milestone>();
        public List<BidDTO> Bids { get; set; } = new List<BidDTO>();
    }
}
