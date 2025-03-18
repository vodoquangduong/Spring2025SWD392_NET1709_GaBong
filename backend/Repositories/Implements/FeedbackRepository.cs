using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public FeedbackRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Feedback> CreateAsync(Feedback feedback)
        {
            await _unitOfWork.GetRepo<Feedback>().CreateAsync(feedback);
            await _unitOfWork.SaveChangesAsync();

            return feedback;
        }

        public async Task UpdateAsync(Feedback feedback)
        {
            await _unitOfWork.GetRepo<Feedback>().UpdateAsync(feedback);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Feedback feedback)
        {
            await _unitOfWork.GetRepo<Feedback>().DeleteAsync(feedback);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<Feedback?> GetSingleByProjecIdAsync(long projectId)
        {
            var feedback = await _unitOfWork.GetRepo<Feedback>().GetSingleAsync(new QueryOptions<Feedback>
            {
                Predicate = f => f.ProjectId == projectId
            });

            return feedback;
        }

        public async Task<IEnumerable<Feedback>> GetAllByAccountIdAsync(long accountId)
        {
            var queryOptions = new QueryBuilder<Feedback>()
            .WithInclude(p => p.Project)
            .WithPredicate(p => p.Project.FreelancerId == accountId)
            .WithOrderBy(o => o.OrderByDescending(f => f.CreatedAt))
            .Build();
            var feedbacks = await _unitOfWork.GetRepo<Feedback>().GetAllAsync(queryOptions);

            return feedbacks;
        }

        public async Task<IEnumerable<Feedback>> GetAllAsync()
        {
            var feedbacks = await _unitOfWork.GetRepo<Feedback>().GetAllAsync(new QueryOptions<Feedback>());

            return feedbacks;
        }
    }
}
