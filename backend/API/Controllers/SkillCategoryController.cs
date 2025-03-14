using AutoMapper;
using Helpers.DTOs.SkillCategory;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillCategoryController : ControllerBase
    {


        private readonly ISkillCategoryService _skillCategoryService;
        private readonly IMapper _mapper;


        public SkillCategoryController(ISkillCategoryService skillCategoryService, IMapper mapper)
        {
            _skillCategoryService = skillCategoryService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllService()
        {
            var skillCategory = await _skillCategoryService.GetAllSkillCategoryAsync();
            var skillCategoryDTOs = skillCategory.Select(_mapper.Map<SkillCategoryDTO>);
            return Ok(skillCategoryDTOs);
        }


        [HttpPost]
        public async Task<IActionResult> CreateSkillVategoryAsync([FromBody] CreateSkillCategoryDTO createSkillCategoryDTO)
        {
            var skillCategory = await _skillCategoryService.CreateSkillCategoryAsync( createSkillCategoryDTO);
            if (skillCategory == null)
            {
                return NotFound("Create fail");
            }
            return Ok(skillCategory);
        }
    }
}
