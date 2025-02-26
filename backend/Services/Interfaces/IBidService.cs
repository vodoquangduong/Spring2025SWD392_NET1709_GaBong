using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Helpers.HelperClasses;


namespace Services.Interfaces
{
    public interface IBidService
    {
        Task<Result<IEnumerable<BidDTO>>> GetAllBidsByProjectIdAsync(long projectId);
        Task<Result<IEnumerable<BidDTO>>> GetAllBidsByFreelancerIdAsync(long freelancerId);
        Task<Result<BidDTO>> GetBidByIdAsync(long id);
        Task<Result<BidDTO>> CreateBidAsync(CreateBidDTO bidDto, long freelancerId);
        Task<Result<BidDTO>> UpdateBidAsync(Bid bid);
        Task<Result<bool>> DeleteBidAsync(long id);
    }
}
