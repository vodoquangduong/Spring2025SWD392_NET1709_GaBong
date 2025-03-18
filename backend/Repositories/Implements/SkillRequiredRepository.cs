using BusinessObjects.Models;
using DAOs;
using Repositories.Interfaces;
using Repositories.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Implements
{
    public class SkillRequiredRepository : ISkillRequiredRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public SkillRequiredRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<SkillCategory>> GetSkillByProjectIdAsync(long projectId)
        {
            var queryOptions = new QueryBuilder<SkillRequired>()
                .WithTracking(false)
                .WithInclude(sr => sr.SkillCategory)
                .WithPredicate(sr => sr.ProjectId == projectId)  // Chỉ lấy dữ liệu theo projectId
                .Build();

            var skills = await _unitOfWork.GetRepo<SkillRequired>().GetAllAsync(queryOptions);
            return skills.Select(sr => sr.SkillCategory).ToList();
        }

        public async Task CreateAllAsync(List<SkillRequired> skillRequireds)
        {
            await _unitOfWork.GetRepo<SkillRequired>().CreateAllAsync(skillRequireds);
            await _unitOfWork.SaveChangesAsync();
        }

    }
}
