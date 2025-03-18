using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface IBidRepository
    {
        Task<Bid> CreateBidAsync(Bid bid);
        Task<Bid?> GetChoosenBid(long projectId, long freelancerId);
        Task<IEnumerable<Bid>> GetBidsByProjectAsync(long projectId);
        IQueryable<Bid> GetAllBidByFreelancerIdPaging(long freelancerId);
        IQueryable<Bid> GetAllBidByProjectIdPaging(long projectId);
    }
}
