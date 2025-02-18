using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Project;
using Microsoft.AspNetCore.Mvc;
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
        // [HttpPost]
        // public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO project)
        // {
        //     var createdProject = await _projectService.CreateProjectAsync(project, userId);
        //     return Ok(createdProject);
        // }
        [HttpGet("test-current-user")]
public IActionResult TestCurrentUser()
{
    try
    {
        var userId = _currentUserService.UserId;
        var role = _currentUserService.Role;
        
        return Ok(new { UserId = userId, Role = role });
    }
    catch (UnauthorizedAccessException ex)
    {
        return Unauthorized(ex.Message);
    }
}
    }
}