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

        public ProjectController(
            IProjectService projectService,
            ICurrentUserService currentUserService
        )
        {
            _projectService = projectService;
            _currentUserService = currentUserService;
        }

        /// <summary>
        /// Tempotary solution for getting all projects.
        /// </summary>
        /// <returns>A list of chat rooms for the specified user.</returns>
        /// <response code="200">Returns the list of chat rooms.</response>
        /// <response code="404">If no chat rooms are found for the user.</response>
        [HttpGet("")]
        public async Task<IActionResult> GetAllProjectsAsync()
        {
            var response = await _projectService.GetAllProjectsAsync();
            if (response.IsFailure)
            {
                return Ok(response.Error);
            }
            return Ok(response);
        }

        /// <summary>
        /// Get all verified project.
        /// </summary>
        /// <response code="200">Returns the list of chat rooms.</response>
        /// <response code="404">If no chat rooms are found for the user.</response>
        [HttpGet("verified")]
        public async Task<IActionResult> GetAllProjectsVerifiedAsync(
            [FromQuery] Query query,
            [FromQuery] ProjectFilter projectFilter
        )
        {
            var response = await _projectService.GetAllProjectsVerifiedAsync(
                query.PageNumber,
                query.PageSize,
                projectFilter
            );
            if (response.IsFailure)
            {
                return Ok(response.Error);
            }
            return Ok(response);
        }

        /// <summary>
        /// Get all pending project.
        /// </summary>
        /// <param name="query"></param>
        /// <response code="200">Returns the list of chat rooms.</response>
        /// <response code="404">If no chat rooms are found for the user.</response>
        [HttpGet("pending")]
        public async Task<IActionResult> GetAllProjectsPendingAsync([FromQuery] Query query)
        {
            var response = await _projectService.GetAllProjectsPendingAsync(
                query.PageNumber,
                query.PageSize
            );
            if (response.IsFailure)
            {
                return Ok(response.Error);
            }
            return Ok(response);
        }

        [HttpPost("post-project")]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDTO project)
        {
            var result = await _projectService.CreateProjectAsync(project);
            if (result.IsFailure)
            {
                return Ok(result.Error);
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
                return Ok(
                    new
                    {
                        UserId = userId,
                        Role = role,
                        Email = email,
                    }
                );
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPut("verify")]
        public async Task<IActionResult> VerifyProject([FromBody] VerrifiedProjectDTO verify)
        {
            var result = await _projectService.VerifyProjectAsync(verify);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok("Project verified");
        }

        [HttpPut("choose-freelancer")]
        public async Task<IActionResult> ChooseFreelancer(
            [FromBody] ChooseFreelancerDTO chooseFreelancerDTO
        )
        {
            var result = await _projectService.ChooseFreelancerAsync(
                chooseFreelancerDTO.ProjectId,
                chooseFreelancerDTO.FreelancerId
            );
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok("Project is on going");
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProject(
            [FromBody] UpdateProjectDTO updateProjectDTO,
            [FromRoute] long id
        )
        {
            var result = await _projectService.UpdateProjectAsync(updateProjectDTO, id);
            if (result.Value == null)
            {
                return Ok("Project not found");
            }
            return Ok("Update project success");
        }
    }
}
