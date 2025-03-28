using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs;
using Helpers.DTOs.Contract;
using Helpers.HelperClasses;
using Microsoft.Extensions.Configuration;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Implements
{
    public class ContractService : IContractService
    {
        //private readonly IUnitOfWork _unitOfWork;
        //private readonly IConfiguration _configuration;
        private readonly IProjectRepository _projectRepository;
        private readonly IBidRepository _bidRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IContractRepository _contractRepository;
        private readonly IAdminConfigService _adminConfigService;
        private readonly IMapper _mapper;
        public ContractService(
            //IUnitOfWork unitOfWork,
            //IConfiguration configuration,
            IProjectRepository projectRepository,
            IBidRepository bidRepository,
            IAccountRepository accountRepository,
            ITransactionRepository transactionRepository,
            IContractRepository contractRepository,
            IAdminConfigService adminConfigService,
            IMapper mapper
            )
        {
            //_unitOfWork = unitOfWork;
            //_configuration = configuration;
            _projectRepository = projectRepository;
            _bidRepository = bidRepository;
            _accountRepository = accountRepository;
            _transactionRepository = transactionRepository;
            _contractRepository = contractRepository;
            _adminConfigService = adminConfigService;
            _mapper = mapper;
        }

        public async Task<Result<ContractDTO>> CreateContractAsync(
            CreateContractDTO createContractDTO
        )
        {
            try
            {
                //<==Query Project==>
                //var queryProject = new QueryBuilder<Project>()
                //    .WithTracking(false)
                //    .WithPredicate(p => p.ProjectId == createContractDTO.ProjectId)
                //    .Build();
                //var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryProject);
                var project = await _projectRepository.GetSingleByIdAsync(createContractDTO.ProjectId);

                if (project == null)
                {
                    Console.WriteLine("Project not found");
                    return Result.Failure<ContractDTO>(
                        new Error(
                            "Project.NotFound",
                            $"Project with id {createContractDTO.ProjectId} not found"
                        )
                    );
                }
                if (project.FreelancerId != null)
                {
                    Console.WriteLine("This project is already contracted");
                    return Result.Failure<ContractDTO>(
                        new Error(
                            "Contract.AlreadyContracted",
                            $"Project with id {createContractDTO.ProjectId} is already contracted"
                        )
                    );
                }

                //<==Query Bid==>
                //var queryBid = new QueryBuilder<Bid>()
                //    .WithTracking(false)
                //    .WithPredicate(b =>
                //        b.BidOwnerId == createContractDTO.freelancerId
                //        && b.ProjectId == createContractDTO.ProjectId
                //    )
                //    .Build();
                //var choosenBid = await _unitOfWork.GetRepo<Bid>().GetSingleAsync(queryBid);
                var choosenBid = await _bidRepository.GetChoosenBid(createContractDTO.ProjectId, createContractDTO.freelancerId);

                //<==Query client==>
                //var queryClient = new QueryBuilder<Account>()
                //    .WithTracking(false)
                //    .WithPredicate(a => a.AccountId == project.ClientId)
                //    .Build();
                //var client = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryClient);
                var client = await _accountRepository.GetSingleByAccountIdAsync(project.ClientId);

                //<==Check client credit enough for project or not==>
                client.LockCredit -= project.EstimateBudget;
                var clientAvailable = client.TotalCredit - client.LockCredit;

                decimal projectFee;
                //if (!decimal.TryParse(_configuration["PaymentPolicy:ProjectFee"], out projectFee))
                //{
                //    projectFee = 0.1m;
                //}
                projectFee = _adminConfigService.GetConfig().PaymentPolicy.ProjectFee;
                if (clientAvailable < choosenBid.BidOffer * projectFee)
                {
                    Console.WriteLine("Project not found");
                    return Result.Failure<ContractDTO>(
                        new Error(
                            "Credit not available",
                            "Client credit not available for this offer"
                        )
                    );
                }

                //<==Start create contract==>
                //await _unitOfWork.BeginTransactionAsync();

                //<======Transaction for project fee(10% project amount)=======>
                var transactionProjectFee = new Transaction()
                {
                    AccountId = client.AccountId,
                    Amount = choosenBid.BidOffer * projectFee,
                    Status = BusinessObjects.Enums.TransactionStatus.Pending,
                    CreatedAt = DateTime.UtcNow,
                    Detail = "Fee to create project " + project.ProjectId + ": " + project.ProjectName,
                    Type = BusinessObjects.Enums.TransactionType.Fee,
                };

                //await _unitOfWork.GetRepo<Transaction>().CreateAsync(transactionProjectFee);
                //await _unitOfWork.SaveChangesAsync(); // Save to generate TransactionId
                await _transactionRepository.CreateTransationAsync(transactionProjectFee);

                //<======Apply for client credit======>
                client.TotalCredit -= choosenBid.BidOffer * projectFee;
                client.LockCredit += choosenBid.BidOffer;

                //await _unitOfWork.GetRepo<Account>().UpdateAsync(client);
                //await _unitOfWork.SaveChangesAsync();
                await _accountRepository.UpdateAsync(client);

                //<======Complete transaction======>
                transactionProjectFee.Status = BusinessObjects.Enums.TransactionStatus.Completed;

                //await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transactionProjectFee);
                //await _unitOfWork.SaveChangesAsync();
                await _transactionRepository.UpdateAsync(transactionProjectFee);

                //<======Create Contract======>
                var contract = _mapper.Map<Contract>(createContractDTO);
                contract.StartDate = DateTime.UtcNow;

                //await _unitOfWork.GetRepo<Contract>().CreateAsync(contract);
                //await _unitOfWork.SaveChangesAsync();
                await _contractRepository.CreateAsync(contract);


                //<======Update project======>
                project.FreelancerId = createContractDTO.freelancerId;
                project.Status = BusinessObjects.Enums.ProjectStatus.OnGoing;
                project.EstimateBudget = choosenBid.BidOffer;

                //await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                await _projectRepository.UpdateAsync(project);

                //<======Update bid(refund money bid for freelancer)======>\
                await refundBid(project);

                //<===Finish contract===>
                //await _unitOfWork.SaveChangesAsync();
                //await _unitOfWork.CommitTransactionAsync();

                return Result.Success(_mapper.Map<ContractDTO>(contract));
            }
            catch (Exception e)
            {
                //await _unitOfWork.RollBackAsync();

                return Result.Failure<ContractDTO>(new Error("Contract.CreationFailed", e.Message));
            }
        }

        public async Task<Result<PaginatedResult<ContractDTO>>> GetAllContractAsync(
            int pageNumber,
            int pageSize
        )
        {
            try
            {
                //var contracts = _unitOfWork.GetRepo<Contract>().Get(new QueryOptions<Contract>());
                var contracts = _contractRepository.GetAllContractsPaging();

                var paginatedContracts = await Pagination.ApplyPaginationAsync(
                    contracts,
                    pageNumber,
                    pageSize,
                    _mapper.Map<ContractDTO>
                );
                return Result.Success(paginatedContracts);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<ContractDTO>>(
                    new Error("Contract.GetFailed", e.Message)
                );
            }
        }

        public async Task<Result<ContractDTO>> GetContractByIdAsync(long contractId)
        {
            try
            {
                //var contract = await _unitOfWork
                //    .GetRepo<Contract>()
                //    .GetSingleAsync(
                //        new QueryOptions<Contract> { Predicate = c => c.ContractId == contractId }
                //    );
                var contract = await _contractRepository.GetSigleByContractId(contractId);

                if (contract == null)
                {
                    return Result.Failure<ContractDTO>(
                        new Error("Contract.NotFound", $"Contract with id {contractId} not found")
                    );
                }
                return Result.Success(_mapper.Map<ContractDTO>(contract));
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
                //var contract = await _unitOfWork
                //    .GetRepo<Contract>()
                //    .GetSingleAsync(
                //        new QueryOptions<Contract> { Predicate = c => c.ProjectId == projectId }
                //    );
                var contract = await _contractRepository.GetSigleByProjectId(projectId);

                if (contract == null)
                {
                    return Result.Failure<ContractDTO>(
                        new Error(
                            "Contract.NotFound",
                            $"Contract with project id {projectId} not found"
                        )
                    );
                }
                return Result.Success(_mapper.Map<ContractDTO>(contract));
            }
            catch (Exception e)
            {
                return Result.Failure<ContractDTO>(new Error("Contract.GetFailed", e.Message));
            }
        }

        public async Task refundBid(Project project)
        {
            //var bidquery = new QueryBuilder<Bid>()
            //    .WithTracking(false)
            //    .WithInclude(b => b.BidOwner)
            //    .WithPredicate(b => b.ProjectId == project.ProjectId)
            //    .Build();
            //var bids = await _unitOfWork.GetRepo<Bid>().GetAllAsync(bidquery);
            var bids = await _bidRepository.GetBidsByProjectAsync(project.ProjectId);

            var choosenBid = project.FreelancerId;
            Account freelancer;
            foreach (var item in bids)
            {
                //<======Check freelancer======>
                if (item.BidOwnerId != choosenBid)
                {
                    //<======Get freelancer who not choosen======>
                    //var options = new QueryBuilder<Account>()
                    //    .WithTracking(true)
                    //    .WithPredicate(a => a.AccountId == item.BidOwnerId)
                    //    .Build();

                    //freelancer = await _unitOfWork.GetRepo<Account>().GetSingleAsync(options);
                    freelancer = await _accountRepository.GetSingleByAccountIdAsync(item.BidOwnerId);

                    decimal bidFee;
                    //if (!decimal.TryParse(_configuration["PaymentPolicy:BidFee"], out bidFee))
                    //{
                    //    bidFee = 2m;
                    //}
                    bidFee = _adminConfigService.GetConfig().PaymentPolicy.BidFee;
                    //<======Transaction for refund fee(2$ to bid)=======>
                    var transactionRefundFee = new Transaction()
                    {
                        AccountId = freelancer.AccountId,
                        Amount = bidFee,
                        Status = BusinessObjects.Enums.TransactionStatus.Pending,
                        CreatedAt = DateTime.UtcNow,
                        Type = BusinessObjects.Enums.TransactionType.Refund,
                        Detail = "Refund for reject proposal of project " + project.ProjectId + ": " + project.ProjectName
                    };

                    //await _unitOfWork.GetRepo<Transaction>().CreateAsync(transactionRefundFee);
                    //await _unitOfWork.SaveChangesAsync();
                    await _transactionRepository.CreateTransationAsync(transactionRefundFee);


                    //<=======Update freelancer balance=======>
                    freelancer.TotalCredit += transactionRefundFee.Amount;

                    //await _unitOfWork.GetRepo<Account>().UpdateAsync(freelancer);
                    //await _unitOfWork.SaveChangesAsync();
                    await _accountRepository.UpdateAsync(freelancer);


                    //<======Complete transaction=======>
                    transactionRefundFee.Status = BusinessObjects.Enums.TransactionStatus.Completed;

                    //await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transactionRefundFee);
                    //await _unitOfWork.SaveChangesAsync();
                    await _transactionRepository.UpdateAsync(transactionRefundFee);
                }
            }
        }
    }
}
