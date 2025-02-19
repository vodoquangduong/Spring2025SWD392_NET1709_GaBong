using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs;
using Helpers.DTOs.Contract;
using Helpers.HelperClasses;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class ContractService : IContractService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ContractService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Result<ContractDTO>> CreateContractAsync(CreateContractDTO createContractDTO)
        {
            try
            {
                var project = await _unitOfWork.GetRepo<Project>().AnyAsync(new QueryOptions<Project>
                {
                    Predicate = p => p.ProjectId == createContractDTO.ProjectId
                });
                if(!project)
                {
                    Console.WriteLine("Project not found");
                    return Result.Failure<ContractDTO>(new Error("Project.NotFound", $"Project with id {createContractDTO.ProjectId} not found"));
                }
                await _unitOfWork.BeginTransactionAsync();
                var contract =_mapper.Map<Contract>(createContractDTO);
                contract.StartDate = DateTime.UtcNow;
                await _unitOfWork.GetRepo<Contract>().CreateAsync(contract);
                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();
                return Result.Success(_mapper.Map<ContractDTO>(contract));
            }
            catch (Exception e)
            {
                await _unitOfWork.RollBackAsync();
                return Result.Failure<ContractDTO>(new Error("Contract.CreationFailed", e.Message));
            }
        }

        public async Task<Result<IEnumerable<ContractDTO>>> GetAllContractAsync()
        {
            try
            {
                var contracts = await _unitOfWork.GetRepo<Contract>().GetAllAsync(new QueryOptions<Contract>());
                return Result.Success(_mapper.Map<IEnumerable<ContractDTO>>(contracts));
            }
            catch(Exception e)
            {
                return Result.Failure<IEnumerable<ContractDTO>>(new Error("Contract.GetFailed", e.Message));
            }
        }

        public async Task<Result<ContractDTO>> GetContractByIdAsync(long contractId)
        {
            try
            {
                var contract = await _unitOfWork.GetRepo<Contract>().GetSingleAsync(new QueryOptions<Contract>
                {
                    Predicate = c => c.ContractId == contractId
                });
                return _mapper.Map<ContractDTO>(contract);
            }
            catch (Exception e)
            {
                return Result.Failure<ContractDTO>(new Error("Contract.GetFailed", e.Message));

            }
        }
    }
}