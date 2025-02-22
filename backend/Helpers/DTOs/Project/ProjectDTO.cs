using BusinessObjects.Enums;
using BusinessObjects.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class ProjectDTO
{
    public long ProjectId { get; set; }
    public long ClientId { get; set; }
    public long? FreelancerId { get; set; }
    public long? VerifyStaffId { get; set; }
    public DateTime PostDate { get; set; }
    public int AvailableTimeRange { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string ProjectDescription { get; set; } = string.Empty;
    public decimal EstimateBudget { get; set; }
    public string Location { get; set; } = string.Empty;

    public ProjectStatus Status { get; set; }
    public List<long> SkillIds { get; set; } = new List<long>();
}