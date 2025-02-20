using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Helpers.DTOs.Project;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IBidService
    {
        Task<IEnumerable<Bid>> GetAllBidsByProjectIdAsync(long projectId);
        Task<IEnumerable<Bid>> GetAllBidsByFreelancerIdAsync(long freelancerId);
        Task<BidDTO> GetBidByIdAsync(long id);
        Task<Bid> CreateBidAsync(CreateBidDTO bidDto, long freelancerId);
        Task<Bid> UpdateBidAsync(Bid bid);
        Task<bool> DeleteBidAsync(long id);
    }
}
