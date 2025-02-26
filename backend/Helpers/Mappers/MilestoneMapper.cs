using BusinessObjects.Models;
using Helpers.DTOs.Milestone;

namespace Helpers.Mappers
{
    public static class MilestoneMapper
    {
        public static MilestoneDTO ToMilestoneDTO(this Milestone milestone)
        {
            return new MilestoneDTO
            {
                MilestoneId = milestone.MilestoneId,
                MilestoneName = milestone.MilestoneName,
                ProjectId = milestone.ProjectId,
                Deadline = milestone.DeadlineDate.ToString("dd-MM-yyyy"),
                Description = milestone.MilestoneDescription,
                Amount = milestone.PayAmount,
                Status = milestone.Status
            };
        }
    }
}