using Helpers.DTOs.Project;
using Helpers.DTOs.Query;
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

        [HttpGet("get-all-verified-project")]
        public async Task<IActionResult> GetAllProjectsVerifiedAsync([FromQuery]  Query query)
        {
            var response = await _projectService.GetAllProjectsVerifiedAsync(query.PageNumber, query.PageSize);
            if(response.IsFailure)
            {
                return BadRequest(response.Error);
            }
            return Ok(response);
        }
        [HttpGet("get-all-pending-project")]
        public async Task<IActionResult> GetAllProjectsPendingAsync([FromQuery] Query query)
        {
            var response = await _projectService.GetAllProjectsPendingAsync(query.PageNumber, query.PageSize);
            if (response.IsFailure)
            {
                return BadRequest(response.Error);
            }
            return Ok(response);
        }

        [HttpPost("post-project")]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO project)
        {
            var result = await _projectService.CreateProjectAsync(project);
            if(result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
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
        public async Task<IActionResult> VerifyProject([FromRoute] long projectId)
        {
            var result = await _projectService.VerifyProjectAsync(projectId);
            if(result.Value == null)
            {
                return BadRequest("Project not found");
            }
            return Ok("Project verified");
        }

        [HttpPut("choose-freelancer")]
        public async Task<IActionResult> ChooseFreelancer([FromBody] ChooseFreelancerDTO chooseFreelancerDTO)
        {
            await _projectService.ChooseFreelancerAsync(chooseFreelancerDTO.ProjectId, chooseFreelancerDTO.FreelancerId);
            return Ok("Project is on going");
        }
    }
}