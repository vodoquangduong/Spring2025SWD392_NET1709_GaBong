using BusinessObjects.Enums;

public class ProjectDTO
{
    public long ProjectId { get; set; }
    public long ClientId { get; set; }
    public long? FreelancerId { get; set; }
    public long? VerifyStaffId { get; set; }
    public string PostDate { get; set; } = string.Empty;
    public string EndBiddingDate { get; set; } = string.Empty;
    public string ProjectDescription { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    
    // include additional derived/computed properties
    // public string ClientName { get; set; }
    // public string FreelancerName { get; set; }
    
}