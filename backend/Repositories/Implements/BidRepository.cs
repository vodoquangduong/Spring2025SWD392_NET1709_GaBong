using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using DAOs;

namespace Repositories.Implements
{
    public class BidRepository : GenericRepository<Bid>, IBidRepository
    {
        public BidRepository(ApplicationDbContext context) : base(context)
        {
        }
        

    }
}