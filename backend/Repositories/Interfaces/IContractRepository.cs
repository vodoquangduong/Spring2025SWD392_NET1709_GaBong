using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface IContractRepository
    {
        Task<Contract> CreateAsync(Contract contract);
        Task<Contract?> GetSigleByContractId(long contractId);
        Task<Contract?> GetSigleByProjectId(long projectId);
        IQueryable<Contract> GetAllContractsPaging();
    }
}
