using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Milestone;
using Helpers.DTOs.Project;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class MilestoneService : IMilestoneService
    {
        private readonly IUnitOfWork _unitOfWork;
        public MilestoneService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Result<MilestoneDTO>> CreateMilestoneAsync(CreateMilestoneDTO createMilstoneDTO)
        {
            try
            {
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
                {
                    Predicate = p => p.ProjectId == createMilstoneDTO.ProjectId
                });
                if (project == null)
                {
                    return Result.Failure<MilestoneDTO>(new Error("Project not found", $"Project with project id {createMilstoneDTO.ProjectId}"));
                }
                if (string.IsNullOrWhiteSpace(createMilstoneDTO.MilestoneName))
                {
                    return Result.Failure<MilestoneDTO>(new Error("Create milestone failed", "Milestone name can't be empty"));
                }
                if (createMilstoneDTO.Deadline < DateTime.UtcNow)
                {
                    return Result.Failure<MilestoneDTO>(new Error("Create milestone failed", "Deadline must be greater than current date"));
                }
                if (createMilstoneDTO.Amount <= 0)
                {
                    return Result.Failure<MilestoneDTO>(new Error("Create milestone failed", "Amount must be greater than 0"));
                }
                if(createMilstoneDTO.Amount > project.EstimateBudget)
                {
                    return Result.Failure<MilestoneDTO>(new Error("Create milestone failed", "Amount must be less than or equal to project budget"));
                }
                var milestone = new Milestone
                {
                    ProjectId = createMilstoneDTO.ProjectId,
                    MilestoneName = createMilstoneDTO.MilestoneName,
                    MilestoneDescription = createMilstoneDTO.Description,
                    Status = MilestoneStatus.NotStarted,
                    DeadlineDate = createMilstoneDTO.Deadline,
                    PayAmount = createMilstoneDTO.Amount
                };
                var result = await _unitOfWork.GetRepo<Milestone>().CreateAsync(milestone);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(result.ToMilestoneDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<MilestoneDTO>(new Error("Create milestone failed", $"{e.Message}"));
            }
        }

        public Task<bool> DeleteMilestoneAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<IEnumerable<MilestoneDTO>>> GetAllMilestoneAsync()
        {
            try
            {
                var milestones = await _unitOfWork.GetRepo<Milestone>().GetAllAsync(new QueryOptions<Milestone>());
                return Result.Success(milestones.Select(milestone => milestone.ToMilestoneDTO()));
            }
            catch (Exception e)
            {
                return Result.Failure<IEnumerable<MilestoneDTO>>(new Error("Get all milestone failed", $"{e.Message}"));
            }
        }

        public async Task<Result<MilestoneDTO>> GetMilestoneByProjectIdAsync(long id)
        {
            try
            {
                var queryOptions = new QueryOptions<Milestone>
                {
                    Predicate = m => m.ProjectId == id
                };
                var milestone = await _unitOfWork.GetRepo<Milestone>().GetSingleAsync(queryOptions);
                if (milestone == null)
                {
                    return Result.Failure<MilestoneDTO>(new Error("Milestone not found", $"Milestone with project id {id}"));
                }
                return Result.Success(milestone.ToMilestoneDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<MilestoneDTO>(new Error("Get milestone by project id failed", $"{e.Message}"));
            }
        }

        public async Task<Result<MilestoneDTO>> UpdateMilestoneAsync(UpdateMilestoneDTO updateMilestoneDTO, long milestoneId)
        {
            try
            {
                var queryOptions = new QueryBuilder<Milestone>()
                .WithTracking(true)
                .WithPredicate(a => a.MilestoneId == milestoneId) // Filter by ID
                .Build();
                var milestone = await _unitOfWork.GetRepo<Milestone>().GetSingleAsync(queryOptions);
                if (milestone == null)
                {
                    return Result.Failure<MilestoneDTO>(new Error("Milestone not found", $"Milestone with id {milestoneId}"));
                }
                milestone.MilestoneName = updateMilestoneDTO.MilestoneName;
                milestone.Status = updateMilestoneDTO.Status;
                milestone.DeadlineDate = updateMilestoneDTO.Deadline;
                milestone.MilestoneDescription = updateMilestoneDTO.Description;
                milestone.PayAmount = updateMilestoneDTO.Amount;

                await _unitOfWork.GetRepo<Milestone>().UpdateAsync(milestone);
                await _unitOfWork.SaveChangesAsync();
                return milestone.ToMilestoneDTO();
            }
            catch (Exception e)
            {
                return Result.Failure<MilestoneDTO>(new Error("Update milestone failed", $"{e.Message}"));
            }
        }
    }
}