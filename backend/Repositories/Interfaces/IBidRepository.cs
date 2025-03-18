using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface IBidRepository
    {
        Task<Bid> CreateBidAsync(Bid bid);
        Task<IEnumerable<Bid>> GetBidsByProjectAsync(long projectId);
        IQueryable<Bid> GetAllBidByFreelancerIdPaging(long freelancerId);
        IQueryable<Bid> GetAllBidByProjectIdPaging(long projectId);
    }
}
