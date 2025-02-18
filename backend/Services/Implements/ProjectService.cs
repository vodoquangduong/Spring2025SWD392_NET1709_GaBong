using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Project;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Implements
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProjectService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ProjectDTO> CreateProjectAsync(CreateProjectDTO projectDto, long userId)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var project = _mapper.Map<Project>(projectDto);
                project.ClientId = userId;
                project.Status = ProjectStatus.Pending;
                project.PostDate = DateTime.UtcNow;

                await _unitOfWork.ProjectRepository.AddAsync(project);
                await _unitOfWork.SaveChangesAsync();
                // If  need the client name in the response load the related data
                // project = await _unitOfWork.ProjectRepository.GetByIdWithDetailsAsync(project.ProjectId);
                await _unitOfWork.CommitAsync();
                return _mapper.Map<ProjectDTO>(project);
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }

        

        public Task<bool> DeleteProjectAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            throw new NotImplementedException();
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