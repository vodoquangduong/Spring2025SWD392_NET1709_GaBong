﻿using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.Bid;
using Helpers.DTOs.Transaction;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Microsoft.Extensions.Configuration;
using Repositories.Queries;
using Services.Interfaces;


namespace Services.Implements
{
    public class BidService : IBidService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public BidService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        public async Task<Result<BidDTO>> CreateBidAsync(CreateBidDTO bidDto, long freelancerId)
        {
            try
            {
                
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
                {
                    Predicate = p => p.ProjectId == bidDto.ProjectId
                });
                if (project == null)
                {
                    return Result.Failure<BidDTO>(new Error("Project not found", $"Project with project id {bidDto.ProjectId}"));
                }

                var freelancer = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>
                {
                    Predicate = f => f.AccountId == freelancerId
                });
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
                    Type = BusinessObjects.Enums.TransactionType.Fee,
                };
                await _unitOfWork.GetRepo<Transaction>().CreateAsync(transaction);

                freelancer.LockCredit += bidFee;
                await _unitOfWork.GetRepo<Account>().UpdateAsync(freelancer);
                await _unitOfWork.SaveChangesAsync();

                transaction.Status = BusinessObjects.Enums.TransactionStatus.Completed;
                await _unitOfWork.GetRepo<Transaction>().UpdateAsync(transaction);

                var bid = new Bid()
                {
                    BidOwnerId = freelancerId,
                    BidDescription = bidDto.BidDescription,
                    ProjectId = bidDto.ProjectId,
                    BidOffer = bidDto.BidOffer,
                };

                var result = await _unitOfWork.GetRepo<Bid>().CreateAsync(bid);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(result.ToBidDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<BidDTO>(new Error("Create bid failed", $"{e.Message}"));
            }
        }

        public Task<Result<bool>> DeleteBidAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<IEnumerable<BidDTO>>> GetAllBidsByFreelancerIdAsync(long freelancerId)
        {
            var queryOptions = new QueryBuilder<Bid>()
          .WithTracking(false) // No tracking for efficient
          .WithPredicate(bid => bid.BidOwnerId == freelancerId)
          .Build();
            var contracts = await _unitOfWork.GetRepo<Bid>().GetAllAsync(queryOptions);
            if (contracts.Count() == 0)
            {
                return Result.Failure<IEnumerable<BidDTO>>(new Error("No bids found", "No bids found"));
            }
            return Result.Success(contracts.Select(contract => contract.ToBidDTO()));
        }

        public async Task<Result<IEnumerable<BidDTO>>> GetAllBidsByProjectIdAsync(long projectId)
        {
            var queryOptions = new QueryBuilder<Bid>()
           .WithInclude(bid => bid.BidOwner)
           .WithTracking(false) // No tracking for efficient
           .WithPredicate(bid => bid.ProjectId == projectId)
           .Build();
            var bids = await _unitOfWork.GetRepo<Bid>().GetAllAsync(queryOptions);
            if (bids.Count() == 0)
            {
                return Result.Failure<IEnumerable<BidDTO>>(new Error("No bids found", "No bids found"));
            }
            return Result.Success(bids.Select(bid => bid.ToBidDTO()));
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
