using BusinessObjects.Models;

public static class ProjectMapper
{
    public static ProjectDTO ToProjectDTO(this Project project)
    {
        if (project == null) return new ProjectDTO();

        return new ProjectDTO
        {
            ProjectId = project.ProjectId,
            ClientId = project.ClientId,
            FreelancerId = project.FreelancerId,
            VerifyStaffId = project.VerifyStaffId,
            PostDate = project.PostDate.ToString("dd-MM-yyyy"),
            ProjectName = project.ProjectName,
            Location = project.Location,
            EstimateBudget = project.EstimateBudget,
            AvailableTimeRange = project.AvailableTimeRange,
            ProjectDescription = project.ProjectDescription,
            Status = project.Status,
            SkillIds = project.SkillRequired?.Select(sr => sr.SkillId).ToList() ?? new List<long>(),
        };
    }
}