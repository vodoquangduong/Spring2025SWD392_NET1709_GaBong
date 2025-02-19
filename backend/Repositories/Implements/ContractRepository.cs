
using BusinessObjects.Models;
using DAOs;
using Repositories.Interfaces;

namespace Repositories.Implements
{
    public class ContractRepository : GenericRepository<Contract>, IContractRepository
    {
        public ContractRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}