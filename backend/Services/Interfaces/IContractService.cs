using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs;
using Helpers.DTOs.Contract;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IContractService
    {
        Task<Result<ContractDTO>> CreateContractAsync(CreateContractDTO createContractDTO);
        Task<Result<IEnumerable<ContractDTO>>> GetAllContractAsync(); 
        Task<Result<ContractDTO>> GetContractByIdAsync(long contractId);
    }
}