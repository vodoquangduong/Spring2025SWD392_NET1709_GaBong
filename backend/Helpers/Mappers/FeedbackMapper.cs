using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs.Feedback;

namespace Helpers.Mappers
{
    public static class FeedbackMapper
    {
        public static FeedbackDTO ToFeedbackDTO(this Feedback feedback)
        {
            return new Feedback
            {
                FeedbackId = feedback.FeedbackId,
                ProjectId = feedback.ProjectId,
                Rating = feedback.Rating,
                FeedbackComment = feedback.FeedbackComment,
                
            }
        }
    }
}