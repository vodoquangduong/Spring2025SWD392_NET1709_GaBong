using Helpers.DTOs;
using Helpers.DTOs.Contract;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IContractService
    {
        Task<Result<ContractDTO>> CreateContractAsync(CreateContractDTO createContractDTO);
        Task<Result<PaginatedResult<ContractDTO>>> GetAllContractAsync(int pageNumber, int pageSize);
        Task<Result<ContractDTO>> GetContractByIdAsync(long contractId);
        Task<Result<ContractDTO>> GetContractByProjectIdAsync(long projectId);
    }
}