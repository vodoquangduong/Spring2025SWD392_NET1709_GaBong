using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Bid;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IBidService
    {
        Task<Result<IEnumerable<BidDTO>>> GetAllBidsAsync();
        Task<Result<BidDTO>> CreateBidAsync(CreateBidDTO createBidDTO);
    }
}