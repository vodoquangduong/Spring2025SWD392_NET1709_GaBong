using Helpers.DTOs.Feedback;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IFeedbackService
    {
        Task<Result<IEnumerable<FeedbackDTO>>> GetAllFeedbacksAsync();
        Task<Result<FeedbackDTO>> GetFeedbackByProjectIdAsync(long projectId);
        Task<Result<IEnumerable<FeedbackPortfolioViewDTO>>> GetFeedbacksByFreelancerIdAsync(long freelancerId);
        Task<Result<FeedbackDTO>> CreateFeedbackAsync(CreateFeedbackDTO feedbackDTO);
        Task<Result<FeedbackDTO>> UpdateFeedback(UpdateFeedbackDTO updateDTO);
        Task<Result> DeleteFeedback(long projectId);
    }
}