using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Feedback;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IFeedbackService
    {
        Task<Result<PaginatedResult<FeedbackDTO>>> GetAllReportsAsync(int pageNumber, int pageSize);
        Task<Result<IEnumerable<FeedbackDTO>>> GetReportsByProjectIdAsync(long projectId, int pageNumber, int pageSize);
        Task<Result<IEnumerable<FeedbackDTO>>> GetReportsByFreelancerIdAsync(long freelancerId);
        Task<Result<FeedbackDTO>> CreateFeedbackAsync(CreateFeedbackDTO feedbackDTO);
    }
}