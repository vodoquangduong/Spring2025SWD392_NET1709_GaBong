using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillRequiredController : ControllerBase
    {


        private readonly ISkillRequiredService _skillRequiredService;

        public SkillRequiredController(ISkillRequiredService skillRequiredService)
        {
            _skillRequiredService = skillRequiredService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectSkill([FromRoute] long id)
        {
            var skills = await _skillRequiredService.GetSkillByProjectIdAsync(id);
            if (skills == null)
            {
                return NotFound("Skill required of this project not found");
            }
            return Ok(skills);
        }
    }
}
