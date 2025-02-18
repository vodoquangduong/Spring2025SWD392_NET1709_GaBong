using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Services.Interfaces;

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

        public async Task<BidDTO> CreateBidAsync(CreateBidDTO createBidDTO)
        {
            try 
            {
                var project = await _unitOfWork.ProjectRepository.GetByIdAsync(createBidDTO.ProjectId);
                var bid = _mapper.Map<Bid>(createBidDTO);
                bid.BidOwnerId = _currentUserService.AccountId;
                bid.CreatedAt = DateTime.UtcNow;
                await _unitOfWork.BidRepository.AddAsync(bid);
                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<BidDTO>(bid);
            }
            catch (KeyNotFoundException)
            {
                throw new Exception($"Project with id {createBidDTO.ProjectId} not found");
            }
        }

        public async Task<IEnumerable<BidDTO>> GetAllBidsAsync()
        {
            var bids = await _unitOfWork.BidRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<BidDTO>>(bids);
        }
    }
}