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
    public class MilestoneRepository : IMilestoneRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public MilestoneRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Milestone?> GetMilestoneByIdAsync(long milestoneId)
        {
            var queryOptions = new QueryBuilder<Milestone>()
                .WithTracking(true)
                .WithPredicate(m => m.MilestoneId == milestoneId)
                .Build();

            return await _unitOfWork.GetRepo<Milestone>().GetSingleAsync(queryOptions);
        }

        public async Task<List<Milestone>> GetMilestonesByProjectIdAsync(long projectId)
        {
            var queryOptions = new QueryBuilder<Milestone>()
                .WithTracking(false)
                .WithPredicate(m => m.ProjectId == projectId)
                .Build();

            return await _unitOfWork.GetRepo<Milestone>().GetAllAsync(queryOptions);
        }

        public async Task<Milestone> CreateMilestoneAsync(Milestone milestone)
        {
            var result = await _unitOfWork.GetRepo<Milestone>().CreateAsync(milestone);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task CreateAllAsync(List<Milestone> milestones)
        {
            await _unitOfWork.GetRepo<Milestone>().CreateAllAsync(milestones);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task UpdateMilestoneAsync(Milestone milestone)
        {
            await _unitOfWork.GetRepo<Milestone>().UpdateAsync(milestone);
            await _unitOfWork.SaveChangesAsync();
        }
    }

}
