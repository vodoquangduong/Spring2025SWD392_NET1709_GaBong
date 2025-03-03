using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Feedback;
using Helpers.HelperClasses;
using Microsoft.AspNetCore.Http.Extensions;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IUnitOfWork _unitOfWork;
        public FeedbackService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Result<FeedbackDTO>> CreateFeedbackAsync(CreateFeedbackDTO feedbackDTO)
        {
            try
            {
                var queryOptions = new QueryBuilder<Project>()
                .WithTracking(false)
                .WithPredicate( p => p.ProjectId == feedbackDTO.ProjectId)
                .Build();
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                if(project == null)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Create feedback failed", $"Project id {feedbackDTO.ProjectId} not found"));
                }
                if(project.Status != ProjectStatus.Completed)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Create feedback failed", $"Project with id {feedbackDTO.ProjectId} is not completed"));
                }
                
            }
        }

        public Task<Result<PaginatedResult<FeedbackDTO>>> GetAllReportsAsync(int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<Result<IEnumerable<FeedbackDTO>>> GetReportsByFreelancerIdAsync(long freelancerId)
        {
            throw new NotImplementedException();
        }

        public Task<Result<IEnumerable<FeedbackDTO>>> GetReportsByProjectIdAsync(long projectId, int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }
    }
}