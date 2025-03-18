using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Helpers.HelperClasses;
using Microsoft.Extensions.Configuration;
using Repositories.Interfaces;
using Services.Interfaces;


namespace Services.Implements
{
    public class BidService : IBidService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly IProjectRepository _projectRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IBidRepository _bidRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;

        public BidService(
            //IUnitOfWork unitOfWork, 
            IConfiguration configuration,
            IProjectRepository projectRepository,
            IAccountRepository accountRepository,
            IBidRepository bidRepository,
            ITransactionRepository transactionRepository,
            IMapper mapper)
        {
            //_unitOfWork = unitOfWork;
            _configuration = configuration;
            _projectRepository = projectRepository;
            _accountRepository = accountRepository;
            _bidRepository = bidRepository;
            _transactionRepository = transactionRepository;
            _mapper = mapper;
        }

        public async Task<Result<BidDTO>> CreateBidAsync(CreateBidDTO bidDto, long freelancerId)
        {
            try
            {
                //var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
                //{
                //    Predicate = p => p.ProjectId == bidDto.ProjectId
                //});
                var project = await _projectRepository.GetSingleByIdAsync(bidDto.ProjectId);

                if (project == null)
                {
                    return Result.Failure<BidDTO>(new Error("Project not found", $"Project with project id {bidDto.ProjectId}"));
                }

                //var freelancer = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>
                //{
                //    Predicate = f => f.AccountId == freelancerId
                //});
                var freelancer = await _accountRepository.GetSingleByAccountIdAsync(freelancerId);

                if (freelancer == null)
                {
                    return Result.Failure<BidDTO>(new Error("Freelancer not found", $"Freelancer with id {freelancerId}"));
                }

                decimal bidFee;
                if (!decimal.TryParse(_configuration["PaymentPolicy:BidFee"], out bidFee))
                {
                    bidFee = 2; //default value
                }
                if (freelancer.TotalCredit - freelancer.LockCredit < bidFee)
                {
                    return Result.Failure<BidDTO>(new Error("Can't bid", $"You dont have enough credit to bit on project {bidDto.ProjectId}"));
                }

                var transaction = new Transaction()
                {
                    AccountId = freelancerId,
                    Amount = bidFee,
                    Status = BusinessObjects.Enums.TransactionStatus.Pending,
                    CreatedAt = DateTime.UtcNow,
                    Detail = "Bid on project " + project.ProjectId + ": " + project.ProjectName,
                    Type = BusinessObjects.Enums.TransactionType.Fee,
                };

                //await _unitOfWork.GetRepo<Transaction>().CreateAsync(transaction);
                await _transactionRepository.CreateTransationAsync(transaction);

                freelancer.TotalCredit -= bidFee;

                //await _unitOfWork.GetRepo<Account>().UpdateAsync(freelancer);
                //await _unitOfWork.SaveChangesAsync();
                await _accountRepository.UpdateAsync(freelancer);

                transaction.Status = BusinessObjects.Enums.TransactionStatus.Completed;

                //await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);
                await _transactionRepository.UpdateAsync(transaction);

                var bid = _mapper.Map<Bid>(bidDto);
                bid.BidOwnerId = freelancerId;

                //var result = await _unitOfWork.GetRepo<Bid>().CreateAsync(bid);
                //await _unitOfWork.SaveChangesAsync();
                var result = await _bidRepository.CreateBidAsync(bid);

                return Result.Success(_mapper.Map<BidDTO>(result));
            }
            catch (Exception e)
            {
                return Result.Failure<BidDTO>(new Error("Create bid failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PaginatedResult<BidDTO>>> GetAllBidsByFreelancerIdAsync(long freelancerId, int pageNumber, int pageSize)
        {
            try
            {
                //var queryOptions = new QueryBuilder<Bid>()
                //  .WithTracking(false) // No tracking for efficient
                //  .WithPredicate(bid => bid.BidOwnerId == freelancerId)
                //  .Build();
                //var bids = _unitOfWork.GetRepo<Bid>().Get(queryOptions);
                var bids = _bidRepository.GetAllBidByFreelancerIdPaging(freelancerId);

                if (bids.Count() == 0)
                {
                    return Result.Failure<PaginatedResult<BidDTO>>(new Error("No bids found", "No bids found"));
                }
                var paginatedBids = await Pagination.ApplyPaginationAsync(bids, pageNumber, pageSize, _mapper.Map<BidDTO>);
                return Result.Success(paginatedBids);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<BidDTO>>(new Error("View bids failed", $"{e.Message}"));
            }
        }

        public async Task<Result<PaginatedResult<BidDTO>>> GetAllBidsByProjectIdAsync(long projectId, int pageNumber, int pageSize)
        {
            try
            {
                // var queryOptions = new QueryBuilder<Bid>()
                //.WithInclude(bid => bid.BidOwner)
                //.WithTracking(false) // No tracking for efficient
                //.WithPredicate(bid => bid.ProjectId == projectId)
                //.Build();
                // var bids = _unitOfWork.GetRepo<Bid>().Get(queryOptions);
                var bids = _bidRepository.GetAllBidByProjectIdPaging(projectId);


                var paginatedBids = await Pagination.ApplyPaginationAsync(bids, pageNumber, pageSize, _mapper.Map<BidDTO>);
                return Result.Success(paginatedBids);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<BidDTO>>(new Error("View bids failed", $"{e.Message}"));
            }
        }

        public Task<Result<BidDTO>> GetBidByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task<Result<BidDTO>> UpdateBidAsync(Bid bid)
        {
            throw new NotImplementedException();
        }
    }
}
