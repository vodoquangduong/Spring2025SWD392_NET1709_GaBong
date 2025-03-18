using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class SkillRequiredRepository : ISkillRequiredRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public SkillRequiredRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<SkillRequired>> GetSkillByProjectIdAsync(long projectId)
        {
            var queryOptions = new QueryBuilder<SkillRequired>()
                .WithTracking(false)
                .WithInclude(sr => sr.SkillCategory)
                .WithInclude(sr => sr.ProjectId)
                .Build();

            var skills = await _unitOfWork.GetRepo<SkillRequired>().GetAllAsync(queryOptions);

            return skills;
        }

        public async Task CreateAllAsync(List<SkillRequired> skillRequireds)
        {
            await _unitOfWork.GetRepo<SkillRequired>().CreateAllAsync(skillRequireds);
            await _unitOfWork.SaveChangesAsync();
        }

    }
}
