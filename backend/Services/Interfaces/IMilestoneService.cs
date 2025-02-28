using Helpers.DTOs.Milestone;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IMilestoneService
    {
        Task<Result<IEnumerable<MilestoneDTO>>> GetAllMilestoneAsync();
        Task<Result<MilestoneDTO>> GetMilestoneByProjectIdAsync(long id);
        Task<Result<MilestoneDTO>> CreateMilestoneAsync(CreateMilestoneDTO createMilestoneDTO);
        Task<Result<MilestoneDTO>> UpdateMilestoneAsync(UpdateMilestoneDTO updateMilestoneDTO, long milestoneId);
        Task<bool> DeleteMilestoneAsync(long id);
    }
}

