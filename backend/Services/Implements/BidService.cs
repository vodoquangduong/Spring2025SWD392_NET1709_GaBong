using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Repositories.Queries;
using Services.Interfaces;
using Helpers.HelperClasses;

namespace Services.Implements
{
    public class BidService : IBidService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public BidService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Result<BidDTO>> CreateBidAsync(CreateBidDTO createBidDTO)
        {
            try 
            {
                var project = await _unitOfWork.GetRepo<Project>().AnyAsync(new QueryOptions<Project>
                {
                    Predicate = p => p.ProjectId == createBidDTO.ProjectId
                });
                if (!project)
                {
                    return Result.Failure<BidDTO>(new Error("Project.NotFound", $"Project with id {createBidDTO.ProjectId} not found"));
                }
                if(createBidDTO.Amount <= 0)
                {
                    return Result.Failure<BidDTO>(new Error("Bid.InvalidAmount", "Amount must be greater than 0"));
                }
                var bid = _mapper.Map<Bid>(createBidDTO);
                bid.BidOwnerId = _currentUserService.AccountId;
                bid.CreatedAt = DateTime.UtcNow;
                await _unitOfWork.GetRepo<Bid>().CreateAsync(bid);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(_mapper.Map<BidDTO>(bid));
            }
            catch (Exception ex)
            {
                return Result.Failure<BidDTO>(new Error("Bid.CreationFailed", ex.Message));
            }
        }

        public async Task<Result<IEnumerable<BidDTO>>> GetAllBidsAsync()
        {
            try
            {
                var bids = await _unitOfWork.GetRepo<Bid>().GetAllAsync(new QueryOptions<Bid>());
                return Result.Success(_mapper.Map<IEnumerable<BidDTO>>(bids));
            }
            catch (Exception ex)
            {
                return Result.Failure<IEnumerable<BidDTO>>(new Error("Bid.RetrievalFailed", ex.Message));
            }
        }
    }
}