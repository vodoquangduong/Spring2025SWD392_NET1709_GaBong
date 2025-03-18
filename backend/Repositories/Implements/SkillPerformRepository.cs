using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class SkillPerformRepository : ISkillPerformRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public SkillPerformRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CreateAllAsync(List<SkillPerform> skillPerforms)
        {
            await _unitOfWork.GetRepo<SkillPerform>().CreateAllAsync(skillPerforms);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<SkillPerform>> GetAllByAccountIdAsync(long accountId)
        {
            var skillResult = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(
                new QueryBuilder<SkillPerform>()
                .WithTracking(false)
                .WithInclude(s => s.SkillCategory)
                .WithPredicate(s => s.AccountId == accountId)
                .Build()
                );
            return skillResult;
        }
        public async Task<IEnumerable<SkillPerform>> GetAllByAccountIdAsync(List<long> accountIds)
        {
            var skillQuery = new QueryBuilder<SkillPerform>()
                                .WithTracking(false)
                                .WithInclude(s => s.SkillCategory)
                                .WithPredicate(s => accountIds.Contains(s.AccountId))
                                .Build();
            var skillPerformList = await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(skillQuery);
            return skillPerformList;
        }
        public async Task DeleteAllAsync(List<SkillPerform> skillsToDelete)
        {
            await _unitOfWork.GetRepo<SkillPerform>().DeleteAllAsync(skillsToDelete);
        }

        public async Task UpdateAsync(SkillPerform skillPerform)
        {
            await _unitOfWork.GetRepo<SkillPerform>().UpdateAsync(skillPerform);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
