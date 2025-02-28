using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using Helpers.Mappers;
using Repositories.Queries;
using Services.Interfaces;


namespace Services.Implements
{
    public class SkillCategoryService : ISkillCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SkillCategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<SkillCategoryDTO> CreateSkillCategoryAsync(CreateSkillCategoryDTO createSkillCategoryDTO)
        {

            var queryOption = new QueryOptions<SkillCategory>
            {
                Predicate = s => s.SkillName == createSkillCategoryDTO.SkillName
            };

            var existingSkill = await _unitOfWork.GetRepo<SkillCategory>().GetSingleAsync(queryOption);

            if (existingSkill != null)
            {
                throw new InvalidOperationException("Skill category with this name already exists.");
            }
            var skillCategory = new SkillCategory
            {
                SkillName = createSkillCategoryDTO.SkillName
            };

            var result = await _unitOfWork.GetRepo<SkillCategory>().CreateAsync(skillCategory);
            await _unitOfWork.SaveChangesAsync();
            return result.ToSkillCategoryDTO();
        }

        public Task DeleteSkillCategoryAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<SkillCategory>> GetAllSkillCategoryAsync()
        {
            var queryOptions = new QueryBuilder<SkillCategory>()
                       .WithTracking(false) // No tracking for efficient
                       .Build();

            return await _unitOfWork.GetRepo<SkillCategory>().GetAllAsync(queryOptions);
        }


        public async Task<List<SkillCategoryDTO>> GetSkillCategoryByIdAsync(long id)
        {
            var queryOptions = new QueryBuilder<SkillCategory>()
                       .WithTracking(false) // No tracking for efficient
                       .WithPredicate(s => s.SkillId == id)
                       .Build();
            var queryResult = await _unitOfWork.GetRepo<SkillCategory>().GetAllAsync(queryOptions);
            var skillCategoryDTOs = queryResult
                                    .Select(skillCategory => skillCategory.ToSkillCategoryDTO())
                                    .ToList();
            return skillCategoryDTOs;
        }
    }
}