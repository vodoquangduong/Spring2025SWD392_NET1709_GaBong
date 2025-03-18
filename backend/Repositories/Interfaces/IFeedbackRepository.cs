using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface IFeedbackRepository
    {
        Task<Feedback> CreateAsync(Feedback feedback);
        Task UpdateAsync(Feedback feedback);
        Task DeleteAsync(Feedback feedback);
        Task<Feedback?> GetSingleByProjecIdAsync(long projectId);
        Task<IEnumerable<Feedback>> GetAllByAccountIdAsync(long accountId);

        Task<IEnumerable<Feedback>> GetAllAsync();
    }
}
