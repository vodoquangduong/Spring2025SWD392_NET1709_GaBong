using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class SkillCateogryRepository : ISkillCategoryRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public SkillCateogryRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<SkillCategory> CreateAsync(SkillCategory skillCategory)
        {
            var result = await _unitOfWork.GetRepo<SkillCategory>().CreateAsync(skillCategory);
            await _unitOfWork.SaveChangesAsync();

            return result;
        }

        public async Task<IEnumerable<SkillCategory>> GetAllBySkillIdAsync(long skillId)
        {
            var queryOptions = new QueryBuilder<SkillCategory>()
                       .WithTracking(false) // No tracking for efficient
                       .WithPredicate(s => s.SkillId == skillId)
                       .Build();
            var queryResult = await _unitOfWork.GetRepo<SkillCategory>().GetAllAsync(queryOptions);

            return queryResult;
        }

        public async Task<IEnumerable<SkillCategory>> GetAll()
        {
            var queryOptions = new QueryBuilder<SkillCategory>()
                       .WithTracking(false) // No tracking for efficient
                       .Build();

            return await _unitOfWork.GetRepo<SkillCategory>().GetAllAsync(queryOptions);
        }

        public async Task<SkillCategory?> GetSingleByIdAsync(long skillId)
        {

            var skillExists = await _unitOfWork.GetRepo<SkillCategory>()
                .GetSingleAsync(new QueryOptions<SkillCategory>
                {
                    Predicate = s => s.SkillId == skillId
                });
            return skillExists;
        }

        public async Task<SkillCategory?> GetSingleBySkillNameAsync(string skillName)
        {
            var queryOption = new QueryOptions<SkillCategory>
            {
                Predicate = s => s.SkillName == skillName
            };
            var existingSkill = await _unitOfWork.GetRepo<SkillCategory>().GetSingleAsync(queryOption);

            return existingSkill;
        }
    }
}
