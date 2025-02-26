using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Project;
using Microsoft.AspNetCore.Mvc;
using Services.Implements;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ICurrentUserService _currentUserService;

        public ProjectController(IProjectService projectService, ICurrentUserService currentUserService)
        {
            _projectService = projectService;
            _currentUserService = currentUserService;
        }

        [HttpGet("get-all-project")]
        public async Task<IActionResult> GetAllProject([FromRoute] int pageNumber = 1, int pageSize = 10)
        {
            var paginatedProjects = await _projectService.GetAllProjectsAsync(pageNumber, pageSize);
            var projectDTOs = paginatedProjects.Items
                            .Select(project => project.ToProjectDTO())
                            .ToList();
            var response = new
            {
                Items = projectDTOs,
                TotalCount = paginatedProjects.TotalCount,
                PageNumber = paginatedProjects.PageNumber,
                PageSize = paginatedProjects.PageSize,
                TotalPages = paginatedProjects.TotalPages
            };

            return Ok(response);
        }

        [HttpPost("post-project")]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO project)
        {
            var createdProject = await _projectService.CreateProjectAsync(project);
            return Ok(createdProject);
        }

        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetProjectById([FromRoute] long projectId)
        {
            var projectDTO = await _projectService.GetProjectByIdAsync(projectId);
            return Ok(projectDTO);
        }

        [HttpGet("test-current-user")]
        public IActionResult TestCurrentUser()
        {
            try
            {
                var userId = _currentUserService.AccountId;
                var role = _currentUserService.Role;
                var email = _currentUserService.Email;
                return Ok(new { UserId = userId, Role = role, Email = email });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPut("verify/{projectId}")]
        public async Task<IActionResult> VeridyProject([FromRoute] long projectId)
        {
            var updatedProject = await _projectService.VerifyProjectAsync(projectId, _currentUserService.AccountId);
            return Ok("Project verified");
        }
    }
}