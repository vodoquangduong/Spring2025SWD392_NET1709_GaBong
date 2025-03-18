using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Implements
{
    public class SkillCateogryRepository : ISkillCategoryRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public SkillCateogryRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<SkillCategory?> GetSingleAsync(long skillId)
        {

            var skillExists = await _unitOfWork.GetRepo<SkillCategory>()
                .GetSingleAsync(new QueryOptions<SkillCategory>
                {
                    Predicate = s => s.SkillId == skillId
                });
            return skillExists;
        }
    }
}
