using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class ContractRepository : IContractRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public ContractRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Contract> CreateAsync(Contract contract)
        {
            var result = await _unitOfWork.GetRepo<Contract>().CreateAsync(contract);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task<Contract?> GetSigleByContractId(long contractId)
        {
            var contract = await _unitOfWork
                .GetRepo<Contract>()
                .GetSingleAsync(
                    new QueryOptions<Contract> { Predicate = c => c.ContractId == contractId }
                );

            return contract;
        }

        public async Task<Contract?> GetSigleByProjectId(long projectId)
        {
            var contract = await _unitOfWork
                .GetRepo<Contract>()
                .GetSingleAsync(
                    new QueryOptions<Contract> { Predicate = c => c.ProjectId == projectId }
                );

            return contract;
        }

        public IQueryable<Contract> GetAllContractsPaging()
        {
            var contracts = _unitOfWork.GetRepo<Contract>().Get(new QueryOptions<Contract>());

            return contracts;
        }

    }
}
