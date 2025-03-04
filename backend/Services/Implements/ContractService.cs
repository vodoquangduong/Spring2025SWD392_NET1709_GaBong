using BusinessObjects.Models;
using Helpers.DTOs;
using Helpers.DTOs.Contract;
using Helpers.HelperClasses;
using Repositories.Queries;
using Services.Interfaces;
using Helpers.Mappers;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace Services.Implements
{
    public class ContractService : IContractService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        public ContractService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }
        public async Task<Result<ContractDTO>> CreateContractAsync(CreateContractDTO createContractDTO)
        {
            try
            {  
                //<==Query Project==>
                var queryProject = new QueryBuilder<Project>()
                    .WithTracking(false)
                    .WithPredicate(p => p.ProjectId == createContractDTO.ProjectId)
                    .Build();
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryProject);
                if(project == null)
                {
                    Console.WriteLine("Project not found");
                    return Result.Failure<ContractDTO>(new Error("Project.NotFound", $"Project with id {createContractDTO.ProjectId} not found"));
                }

                //<==Query Bid==>
                var queryBid = new QueryBuilder<Bid>().WithTracking(false)
                    .WithPredicate(b => b.BidOwnerId == createContractDTO.freelancerId 
                                    && b.ProjectId == createContractDTO.ProjectId)
                    .Build();
                var choosenBid = await _unitOfWork.GetRepo<Bid>().GetSingleAsync(queryBid);

                //<==Query client==>
                var queryClient = new QueryBuilder<Account>().WithTracking(false).WithPredicate(a => a.AccountId == project.ClientId).Build();
                var client = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryClient);

                //<==Check client credit enough for project or not==>
                client.LockCredit -= project.EstimateBudget;
                var clientAvailable = client.TotalCredit - client.LockCredit;

                decimal projectFee;
                if (!decimal.TryParse(_configuration["PaymentPolicy:ProjectFee"], out projectFee))
                {
                    projectFee = 0.1m;
                }
                if (clientAvailable < choosenBid.BidOffer*projectFee)
                {
                    Console.WriteLine("Project not found");
                    return Result.Failure<ContractDTO>(new Error("Creadit not available", "Client credit not available for this offer"));
                }
                
                //<==Start create contract==>
                await _unitOfWork.BeginTransactionAsync();
                //<======Transaction for project fee(10% project amount)=======>
                var transactionProjectFee = new Transaction()
                {
                    AccountId = client.AccountId,
                    Amount = choosenBid.BidOffer*projectFee,
                    Status = BusinessObjects.Enums.TransactionStatus.Pending,
                    CreatedAt = DateTime.UtcNow,
                    Type = BusinessObjects.Enums.TransactionType.Fee,
                };
                await _unitOfWork.GetRepo<Transaction>().CreateAsync(transactionProjectFee);

                //<======Apply for client credit======>
                client.TotalCredit -= choosenBid.BidOffer*projectFee;
                client.LockCredit += choosenBid.BidOffer;
                await _unitOfWork.GetRepo<Account>().UpdateAsync(client);

                //<======Complete transaction======>
                transactionProjectFee.Status = BusinessObjects.Enums.TransactionStatus.Completed;
                await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transactionProjectFee);

                //<======Create Contract======>
                var contract = new Contract()
                {
                    ProjectId = createContractDTO.ProjectId,
                    ContractPolicy = createContractDTO.ContractPolicy,
                    StartDate = DateTime.UtcNow,
                };
                await _unitOfWork.GetRepo<Contract>().CreateAsync(contract);

                //<======Update project======>
                project.FreelancerId = createContractDTO.freelancerId;
                project.Status = BusinessObjects.Enums.ProjectStatus.OnGoing;
                project.EstimateBudget = choosenBid.BidOffer;
                await _unitOfWork.GetRepo<Project>().UpdateAsync(project);

                //<===Finish contract===>
                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();
                return Result.Success(contract.ToContractDTO());
            }
            catch (Exception e)
            {
                await _unitOfWork.RollBackAsync();
                return Result.Failure<ContractDTO>(new Error("Contract.CreationFailed", e.Message));
            }
        }

        public async Task<Result<PaginatedResult<ContractDTO>>> GetAllContractAsync(int pageNumber, int pageSize)
        {
            try
            {
                var contracts = _unitOfWork.GetRepo<Contract>().Get(new QueryOptions<Contract>());
                var paginatedContracts = await Pagination.ApplyPaginationAsync(contracts, pageNumber, pageSize, contract => contract.ToContractDTO());
                return Result.Success(paginatedContracts);
            }
            catch(Exception e)
            {
                return Result.Failure<PaginatedResult<ContractDTO>>(new Error("Contract.GetFailed", e.Message));
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
                if (contract == null)
                {
                    return Result.Failure<ContractDTO>(new Error("Contract.NotFound", $"Contract with id {contractId} not found"));
                }
                return Result.Success(contract.ToContractDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<ContractDTO>(new Error("Contract.GetFailed", e.Message));
            }
        }
        public async Task<Result<ContractDTO>> GetContractByProjectIdAsync(long projectId)
        {
            try
            {
                var contract = await _unitOfWork.GetRepo<Contract>().GetSingleAsync(new QueryOptions<Contract>
                {
                    Predicate = c => c.ProjectId == projectId
                });
                if (contract == null)
                {
                    return Result.Failure<ContractDTO>(new Error("Contract.NotFound", $"Contract with project id {projectId} not found"));
                }
                return Result.Success(contract.ToContractDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<ContractDTO>(new Error("Contract.GetFailed", e.Message));
            }
        }
    }
}