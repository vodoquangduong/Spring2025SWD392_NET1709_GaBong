using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class BidRepository : IBidRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public BidRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Bid> CreateBidAsync(Bid bid)
        {
            var createdBid = await _unitOfWork.GetRepo<Bid>().CreateAsync(bid);
            await _unitOfWork.SaveChangesAsync();
            return createdBid;
        }

        public async Task<Bid?> GetChoosenBid(long projectId, long freelancerId)
        {
            var queryBid = new QueryBuilder<Bid>()
                .WithTracking(false)
                .WithPredicate(b =>
                    b.BidOwnerId == freelancerId
                    && b.ProjectId == projectId
                )
                .Build();
            var choosenBid = await _unitOfWork.GetRepo<Bid>().GetSingleAsync(queryBid);

            return choosenBid;
        }

        public IQueryable<Bid> GetAllBidByFreelancerIdPaging(long freelancerId)
        {
            var queryOptions = new QueryBuilder<Bid>()
              .WithTracking(false) // No tracking for efficient
              .WithPredicate(bid => bid.BidOwnerId == freelancerId)
              .Build();
            var bids = _unitOfWork.GetRepo<Bid>().Get(queryOptions);
            return bids;
        }

        public IQueryable<Bid> GetAllBidByProjectIdPaging(long projectId)
        {
            var queryOptions = new QueryBuilder<Bid>()
           .WithInclude(bid => bid.BidOwner)
           .WithTracking(false) // No tracking for efficient
           .WithPredicate(bid => bid.ProjectId == projectId)
           .Build();
            var bids = _unitOfWork.GetRepo<Bid>().Get(queryOptions);
            return bids;
        }

        public async Task<IEnumerable<Bid>> GetBidsByProjectAsync(long projectId)
        {
            var bidQueryOptions = new QueryBuilder<Bid>()
                .WithTracking(false)
                .WithInclude(b => b.BidOwner)
                .WithPredicate(b => b.ProjectId == projectId)
                .Build();

            var bids = await _unitOfWork.GetRepo<Bid>().GetAllAsync(bidQueryOptions);
            return bids;
        }
    }
}
