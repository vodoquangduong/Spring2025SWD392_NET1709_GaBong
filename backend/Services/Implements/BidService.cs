using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Helpers.DTOs.Project;
using Repositories.Queries;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implements
{
    public class BidService : IBidService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BidService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Bid> CreateBidAsync(CreateBidDTO bidDto, long freelancerId)
        {
            var bid = new Bid()
            {
                BidOwnerId = freelancerId,
                BidDescription = bidDto.BidDescription,
                ProjectId = bidDto.ProjectId,
                BidOffer = bidDto.BidOffer,
            };
            var createdBid = await _unitOfWork.GetRepo<Bid>().CreateAsync(bid);
            await _unitOfWork.SaveChangesAsync();
            return createdBid;
        }

        public Task<bool> DeleteBidAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Bid>> GetAllBidsByFreelancerIdAsync(long freelancerId)
        {
            var queryOptions = new QueryBuilder<Bid>()
          .WithTracking(false) // No tracking for efficient
          .WithPredicate(bid => bid.BidOwnerId == freelancerId)
          .Build();

            return await _unitOfWork.GetRepo<Bid>().GetAllAsync(queryOptions);
        }

        public async Task<IEnumerable<Bid>> GetAllBidsByProjectIdAsync(long projectId)
        {
            var queryOptions = new QueryBuilder<Bid>()
           .WithTracking(false) // No tracking for efficient
           .WithPredicate(bid => bid.ProjectId == projectId)
           .Build();

            return await _unitOfWork.GetRepo<Bid>().GetAllAsync(queryOptions);
        }

        public Task<BidDTO> GetBidByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task<Bid> UpdateBidAsync(Bid bid)
        {
            throw new NotImplementedException();
        }
    }
}
