using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Project;
using Helpers.DTOs.Query;
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

        [HttpGet("get-all-verified-project")]
        public async Task<IActionResult> GetAllProjectsVerifiedAsync([FromQuery]  Query query)
        {
            var response = await _projectService.GetAllProjectsVerifiedAsync(query.PageNumber, query.PageSize);
            return Ok(response);
        }

        [HttpPost("post-project")]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO project)
        {
            var createdProject = await _projectService.CreateProjectAsync(project);
            return Ok(createdProject.ToProjectDTO());
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

        [HttpPut("choose-freelancer")]
        public async Task<IActionResult> ChooseFreelancer([FromBody] ChooseFreelancerDTO chooseFreelancerDTO)
        {
            var updatedProject = await _projectService.ChooseFreelancerAsync(chooseFreelancerDTO.ProjectId, chooseFreelancerDTO.FreelancerId);
            return Ok("Project is on going");
        }
    }
}