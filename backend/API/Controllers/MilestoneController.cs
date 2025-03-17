using Helpers.DTOs.Milestone;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MilestoneController : ControllerBase
    {
        public readonly IMilestoneService _milestoneService;
        public MilestoneController(IMilestoneService milestoneService)
        {
            _milestoneService = milestoneService;
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateMilestone([FromBody] CreateMilestoneDTO milestoneDto)
        {
            var result = await _milestoneService.CreateMilestoneAsync(milestoneDto);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMilestones()
        {
            var result = await _milestoneService.GetAllMilestoneAsync();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpGet("get-by-project/{id}")]
        public async Task<IActionResult> GetMilestoneByProjectId([FromRoute] long id)
        {
            var result = await _milestoneService.GetMilestoneByProjectIdAsync(id);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }


        [HttpPut("update-milestone/{mileStoneId}")]
        public async Task<IActionResult> UpdateMilestone([FromBody] UpdateMilestoneDTO updateMilestoneDTO, [FromRoute] long mileStoneId)
        {
            var result = await _milestoneService.UpdateMilestoneAsync(updateMilestoneDTO, mileStoneId);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok("update milestone success");
        }

        /// <summary>
        /// API to finish a milestone
        /// </summary>
        /// <param name="finishMilestoneDTO"></param>
        /// <returns></returns>
        [HttpPut("finish-milestone")]
        public async Task<IActionResult> FinishMilestone([FromBody] FinishMilestoneDTO finishMilestoneDTO)
        {
            var result = await _milestoneService.FinishMileStone(finishMilestoneDTO);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok("update milestone success");
        }
    }
}