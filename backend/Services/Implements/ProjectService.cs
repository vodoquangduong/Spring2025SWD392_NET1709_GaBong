using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Authentication;
using Helpers.DTOs.Project;
using Helpers.HelperClasses;
using Repositories.Interfaces;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public ProjectService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<Project> CreateProjectAsync(CreateProjectDTO projectDto)
        {
            var project = new Project()
            {
                ClientId = _currentUserService.AccountId,
                ProjectName = projectDto.ProjectName,
                ProjectDescription = projectDto.ProjectDescription,
                AvailableTimeRange = projectDto.AvailableTimeRange,
                EstimateBudget = projectDto.EstimateBudget,
                Status = ProjectStatus.Pending,
                SkillRequired = projectDto.SkillIds.Select(skillId => new SkillRequired
                {
                    SkillId = skillId
                }).ToList()
            };
            var createProject = await _unitOfWork.GetRepo<Project>().CreateAsync(project);
            await _unitOfWork.SaveChangesAsync();
            return createProject;
        }

        public Task<bool> DeleteProjectAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {

            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(false) // No tracking for efficient
            .WithInclude(p => p.SkillRequired)
            
            .Build();

            return await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
        }

        public async Task<ProjectDTO> GetProjectByIdAsync(long projectId)
        {
            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(false) // No tracking for efficient
            .WithPredicate(project => project.ProjectId == projectId)
            .Build();

            var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
            return project.ToProjectDTO();
        }

        public Task<Project> UpdateProjectAsync(Project project)
        {
            throw new NotImplementedException();
        }

        public async Task<Project> VerifyProjectAsync(long projectId, long staffId)
        {
            Console.WriteLine($"Verifying project with ID: {projectId}");

            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(true) 
            .WithPredicate(a => a.ProjectId == projectId) // Filter by ID
            .Build();

            var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
            if (project == null)
            {
                throw new KeyNotFoundException("Project not found");
            }

            project.PostDate = DateTime.UtcNow;
            project.Status = ProjectStatus.Verified;
            project.VerifyStaffId = staffId;

            await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
            await _unitOfWork.SaveChangesAsync();

            return project;
        }
    }
}