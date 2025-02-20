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
            EstimateBudget = project.EstimateBudget,
            AvailableTimeRange = project.AvailableTimeRange,
            ProjectDescription = project.ProjectDescription,
            Status = project.Status,
        };
    }

    public static Account ToAccount(AccountDTO accountDto)
    {
        if (accountDto == null) return null;

        return new Account
        {
            AccountId = accountDto.AccountId,
            Role = Enum.Parse<AccountRole>(accountDto.Role.ToString()),
            Name = accountDto.Name,
            Email = accountDto.Email,
            Password = accountDto.Password,
            Phone = accountDto.Phone,
            Address = accountDto.Address,
            Birthday = accountDto.Birthday,
            Gender = Enum.Parse<Gender>(accountDto.Gender.ToString()),
            ReputationPoint = accountDto.ReputationPoint,
            TotalCredit = accountDto.TotalCredit,
            LockCredit = accountDto.LockCredit,
            CreatedAt = accountDto.CreatedAt,
            Status = Enum.Parse<AccountStatus>(accountDto.Status.ToString()),
        };
    }
}