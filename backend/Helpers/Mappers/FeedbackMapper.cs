using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs.Feedback;

namespace Helpers.Mappers
{
    public static class FeedbackMapper
    {
        public static FeedbackDTO ToFeedbackDTO(this Feedback feedback)
        {
            return new FeedbackDTO
            {
                FeedbackId = feedback.FeedbackId,
                ProjectId = feedback.ProjectId,
                Rating = feedback.Rating,
                Comment = feedback.FeedbackComment,
                CreatedAt = feedback.CreatedAt.ToString("dd-MM-yyyy"),
            };
        }
        public static Feedback ToFeedback(this CreateFeedbackDTO createFeedbackDTO)
        {
            return new Feedback
            {
            ProjectId = createFeedbackDTO.ProjectId,
            FeedbackComment = createFeedbackDTO.Comment,
            Rating = createFeedbackDTO.Rating,
            CreatedAt = DateTime.UtcNow
            };
        }
        public static void ToFeedback(this Feedback feedback, UpdateFeedbackDTO updateDTO)
        {
            feedback.Rating = updateDTO.Rating;
            feedback.FeedbackComment = updateDTO.Comment;
        }
    }
}