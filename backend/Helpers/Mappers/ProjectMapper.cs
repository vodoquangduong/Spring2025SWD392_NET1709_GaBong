using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Project;

public static class ProjectMapper
{
    public static ProjectDTO ToProjectDTO(this Project project)
    {
        if (project == null) return null;

        return new ProjectDTO
        {
            ProjectId = project.ProjectId,
            ClientId = project.ClientId,
            FreelancerId = project.FreelancerId,
            VerifyStaffId = project.VerifyStaffId,
            PostDate = project.PostDate,
            ProjectName = project.ProjectName,
            Location = project.Location,
            EstimateBudget = project.EstimateBudget,
            AvailableTimeRange = project.AvailableTimeRange,
            ProjectDescription = project.ProjectDescription,
            Status = project.Status,
            SkillIds = project.SkillRequired?.Select(sr => sr.SkillId).ToList() ?? new List<long>()
        };
    }
}