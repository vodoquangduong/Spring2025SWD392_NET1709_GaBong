using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Authentication;
using Helpers.DTOs.Project;
using Repositories.Interfaces;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Project> CreateProjectAsync(CreateProjectDTO projectDto, long userId)
        {
            var project = new Project()
            {
                ClientId = userId,
                ProjectName = projectDto.ProjectName,
                ProjectDescription = projectDto.ProjectDescription,
                AvailableTimeRange = projectDto.AvailableTimeRange,
                EstimateBudget = projectDto.EstimateBudget,
              //  SkillRequired = projectDto.SkillRequired,
                Status = ProjectStatus.Pending,
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
            .Build();

            return await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
        }

        public Task<ProjectDTO> GetProjectByIdAsync(long id)
        {
            throw new NotImplementedException();
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