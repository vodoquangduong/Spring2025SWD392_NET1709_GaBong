using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMilestones()
        {
            var result = await _milestoneService.GetAllMilestoneAsync();
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMilestoneByProjectId([FromRoute] long id)
        {
            var result = await _milestoneService.GetMilestoneByProjectIdAsync(id);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
    }
}