using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Bid;

namespace Services.Interfaces
{
    public interface IBidService
    {
        Task<IEnumerable<BidDTO>> GetAllBidsAsync();
        Task<BidDTO> CreateBidAsync(CreateBidDTO createBidDTO);
    }
}