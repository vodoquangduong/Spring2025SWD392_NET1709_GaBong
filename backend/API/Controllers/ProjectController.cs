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

        [HttpGet]
        public async Task<IActionResult> GetAllProject()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            var projectDTOs = projects.Select(project => project.ToProjectDTO());
            return Ok(projectDTOs);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO project)
        {
            var createdProject = await _projectService.CreateProjectAsync(project, _currentUserService.AccountId);
            return Ok(createdProject);
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
    }
}