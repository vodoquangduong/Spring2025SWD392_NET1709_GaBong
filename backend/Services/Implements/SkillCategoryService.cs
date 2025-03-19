using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using Repositories.Interfaces;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class SkillCategoryService : ISkillCategoryService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly ISkillCategoryRepository _skillCategoryRepository;
        private readonly IMapper _mapper;

        public SkillCategoryService(
            //IUnitOfWork unitOfWork, 
            ISkillCategoryRepository skillCategoryRepository,
            IMapper mapper
            )
        {
            //_unitOfWork = unitOfWork;
            _skillCategoryRepository = skillCategoryRepository;
            _mapper = mapper;
        }
        public async Task<SkillCategoryDTO> CreateSkillCategoryAsync(CreateSkillCategoryDTO createSkillCategoryDTO)
        {

            //var queryOption = new QueryOptions<SkillCategory>
            //{
            //    Predicate = s => s.SkillName == createSkillCategoryDTO.SkillName
            //};
            //var existingSkill = await _unitOfWork.GetRepo<SkillCategory>().GetSingleAsync(queryOption);
            var existingSkill = await _skillCategoryRepository.GetSingleBySkillNameAsync(createSkillCategoryDTO.SkillName);

            if (existingSkill != null)
            {
                throw new InvalidOperationException("Skill category with this name already exists.");
            }
            var skillCategory = new SkillCategory
            {
                SkillName = createSkillCategoryDTO.SkillName
            };

            //var result = await _unitOfWork.GetRepo<SkillCategory>().CreateAsync(skillCategory);
            //await _unitOfWork.SaveChangesAsync();
            var result = await _skillCategoryRepository.CreateAsync(skillCategory);

            return _mapper.Map<SkillCategoryDTO>(result);
        }

        public async Task<IEnumerable<SkillCategory>> GetAllSkillCategoryAsync()
        {
            //var queryOptions = new QueryBuilder<SkillCategory>()
            //           .WithTracking(false) // No tracking for efficient
            //           .Build();

            //return await _unitOfWork.GetRepo<SkillCategory>().GetAllAsync(queryOptions);
            return await _skillCategoryRepository.GetAll();
        }

        public async Task<List<SkillCategoryDTO>> GetSkillCategoryByIdAsync(long id)
        {
            //var queryOptions = new QueryBuilder<SkillCategory>()
            //           .WithTracking(false) // No tracking for efficient
            //           .WithPredicate(s => s.SkillId == id)
            //           .Build();
            //var queryResult = await _unitOfWork.GetRepo<SkillCategory>().GetAllAsync(queryOptions);
            var queryResult = await _skillCategoryRepository.GetAllBySkillIdAsync(id);

            var skillCategoryDTOs = queryResult
                                    .Select(_mapper.Map<SkillCategoryDTO>)
                                    .ToList();
            return skillCategoryDTOs;
        }
    }
}