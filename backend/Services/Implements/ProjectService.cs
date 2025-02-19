using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
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
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public ProjectService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO projectDto)
        {
                 try
                 {
                     var userId = _currentUserService.AccountId;
                     await _unitOfWork.BeginTransactionAsync();
                     //map the create project dto to project
                     var project = _mapper.Map<Project>(projectDto);
                     project.ClientId = userId;
                     project.Status = ProjectStatus.Pending;
                     project.PostDate = DateTime.UtcNow;
                     //add the project to the database
                     await _unitOfWork.GetRepo<Project>().CreateAsync(project);
                     await _unitOfWork.SaveChangesAsync();
                     // If  need the client name in the response load the related data
                     // project = await _unitOfWork.ProjectRepository.GetByIdWithDetailsAsync(project.ProjectId);
                     await _unitOfWork.CommitTransactionAsync();
                     return Result.Success(_mapper.Map<ProjectDTO>(project));
                 }
                 catch(Exception ex)
                 {
                     await _unitOfWork.RollBackAsync();
                     return Result.Failure<ProjectDTO>(new Error("Project.CreationFailed", ex.Message));
                 }
            
            
        }



        public Task<bool> DeleteProjectAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<IEnumerable<ProjectDTO>>> GetAllProjectsAsync()
        {   
            try
            {
                var projects = await _unitOfWork.GetRepo<Project>().GetAllAsync(new QueryOptions<Project>());
                return Result.Success(_mapper.Map<IEnumerable<ProjectDTO>>(projects));
            }
            catch(Exception ex)
            {
                return Result.Failure<IEnumerable<ProjectDTO>>(new Error("Project.GetAllFailed", ex.Message));
            }
        }

        public Task<Project> GetProjectByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Project> UpdateProjectAsync(Project project)
        {
            throw new NotImplementedException();
        }
    }
}