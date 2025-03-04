using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Helpers.HelperClasses;


namespace Services.Interfaces
{
    public interface IBidService
    {
        Task<Result<PaginatedResult<BidDTO>>> GetAllBidsByProjectIdAsync(long projectId, int pageNumber, int pageSize);
        Task<Result<PaginatedResult<BidDTO>>> GetAllBidsByFreelancerIdAsync(long freelancerId,int pageNumber, int pageSize);
        Task<Result<BidDTO>> GetBidByIdAsync(long id);
        Task<Result<BidDTO>> CreateBidAsync(CreateBidDTO bidDto, long freelancerId);
        Task<Result<BidDTO>> UpdateBidAsync(Bid bid);
    }
}
