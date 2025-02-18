using BusinessObjects.Enums;

public class ProjectDTO
{
    public long ProjectId { get; set; }
    public long ClientId { get; set; }
    public long? FreelancerId { get; set; }
    public long? VerifyStaffId { get; set; }
    public DateTime PostDate { get; set; }
    public DateTime EndBiddingDate { get; set; }
    public string ProjectDescription { get; set; } = string.Empty;
    public ProjectStatus Status { get; set; }
    
    // include additional derived/computed properties
    // public string ClientName { get; set; }
    // public string FreelancerName { get; set; }
    
}