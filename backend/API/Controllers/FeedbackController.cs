using Helpers.DTOs.Feedback;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;
        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllFeedback()
        {
            var result = await _feedbackService.GetAllFeedbacksAsync();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("freelancer/{freelancerId}")]
        public async Task<IActionResult> GetFeedbacksByFreelancerId([FromRoute] long freelancerId)
        {
            var result = await _feedbackService.GetFeedbacksByFreelancerIdAsync(freelancerId);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetFeedbackByProjectId([FromRoute] long projectId)
        {
            var result = await _feedbackService.GetFeedbackByProjectIdAsync(projectId);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpPost]
        public async Task<IActionResult> CreateFeedback([FromBody] CreateFeedbackDTO createDTO)
        {
            var result = await _feedbackService.CreateFeedbackAsync(createDTO);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateFeedback([FromBody] UpdateFeedbackDTO updateDTO)
        {
            var result = await _feedbackService.UpdateFeedback(updateDTO);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpDelete("{projectId}")]
        public async Task<IActionResult> DeleteFeedbackByProjectId([FromRoute] long projectId)
        {
            var result = await _feedbackService.DeleteFeedback(projectId);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok("Delete success");
        }
    }
}