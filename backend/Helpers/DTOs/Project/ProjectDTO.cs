using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Bid;

public class ProjectDTO
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
    public List<long> SkillIds { get; set; } = new List<long>();
    public List<Milestone> Milestones { get; set; } = new List<Milestone>();
    public List<BidDTO> Bids { get; set; } = new List<BidDTO>();
}