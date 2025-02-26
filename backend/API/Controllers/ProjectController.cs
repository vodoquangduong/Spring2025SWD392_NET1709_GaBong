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
            var result = await _projectService.VerifyProjectAsync(projectId, _currentUserService.AccountId);
            if(result.Value == null)
            {
                return BadRequest("Project not found");
            }
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