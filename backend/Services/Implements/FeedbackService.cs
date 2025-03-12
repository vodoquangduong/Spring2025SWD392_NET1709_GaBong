using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Feedback;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currenUserService;
        private readonly IMapper _mapper;
        public FeedbackService(IUnitOfWork unitOfWork, ICurrentUserService currentUserService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _currenUserService = currentUserService;
            _mapper = mapper;
        }
        public async Task<Result<FeedbackDTO>> CreateFeedbackAsync(CreateFeedbackDTO feedbackDTO)
        {
            try
            {
                var queryOptions = new QueryBuilder<Project>()
                .WithTracking(false)
                .WithPredicate(p => p.ProjectId == feedbackDTO.ProjectId)
                .Build();
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
                if(project == null)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Create feedback failed", $"Project id {feedbackDTO.ProjectId} not found"));
                }
                if(project.Status != ProjectStatus.Completed)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Create feedback failed", $"Project with id {feedbackDTO.ProjectId} is not completed"));
                }
                if(!_currenUserService.Role.Equals("Client") || _currenUserService.AccountId != project.ClientId)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Create portfolio failed", $"You must be the client of this project to create feedback"));
                }
                var newFeedback = _mapper.Map<Feedback>(feedbackDTO);
                await _unitOfWork.GetRepo<Feedback>().CreateAsync(newFeedback);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(_mapper.Map<FeedbackDTO>(newFeedback));
            }
            catch(Exception e)
            {
                return Result.Failure<FeedbackDTO>(new Error("Create feedback failed", $"{e.Message}"));
            }
        }

        public async Task<Result<IEnumerable<FeedbackDTO>>> GetAllFeedbacksAsync()
        {
            try
            {
                var feedbacks = await _unitOfWork.GetRepo<Feedback>().GetAllAsync(new QueryOptions<Feedback>());
                return Result.Success(feedbacks.Select(_mapper.Map<FeedbackDTO>));
            }
            catch(Exception e)
            {
                return Result.Failure<IEnumerable<FeedbackDTO>>(new Error("View all feedbacks failed", $"{e.Message}"));
            }
        }

        public async Task<Result<IEnumerable<FeedbackDTO>>> GetFeedbacksByFreelancerIdAsync(long freelancerId)
        {
            var freelancer = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>{
                Predicate = a => a.AccountId == freelancerId
            });
            if(freelancer == null)
            {
                return Result.Failure<IEnumerable<FeedbackDTO>>(new Error("Get feedback failed",$"Freelancer with id {freelancerId} not found"));
            }
            var queryOptions = new QueryBuilder<Feedback>()
            .WithInclude(p => p.Project)
            .WithPredicate(p => p.Project.FreelancerId == freelancerId)
            .WithOrderBy(o => o.OrderByDescending(f => f.CreatedAt))
            .Build();
            var feedbacks = await _unitOfWork.GetRepo<Feedback>().GetAllAsync(queryOptions);
            return Result.Success(feedbacks.Select(_mapper.Map<FeedbackDTO>));
        }

        public async Task<Result<FeedbackDTO>> GetFeedbackByProjectIdAsync(long projectId)
        {
            try
            {
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
                {
                    Predicate = p => p.ProjectId == projectId && p.Status == ProjectStatus.Completed
                });
                if(project == null)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Get feedbacks by project id failed",$"Project with id {projectId} not found or incompleted"));
                }
                var feedback =  await _unitOfWork.GetRepo<Feedback>().GetSingleAsync(new QueryOptions<Feedback>
                {
                    Predicate = f => f.ProjectId == projectId
                });
                return Result.Success(_mapper.Map<FeedbackDTO>(feedback));
            }
            catch(Exception e)
            {
                return Result.Failure<FeedbackDTO>(new Error("Get feedback failed", $"{e.Message}"));
            }
        }
        public async Task<Result<FeedbackDTO>> UpdateFeedback(UpdateFeedbackDTO updateDTO)
        {
            try
            {
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
                {
                    Predicate = p => p.ProjectId == updateDTO.ProjectId
                });
                if(project == null)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Update feedback failed",$"Project with id {updateDTO.ProjectId} not found"));
                }
                if(project.Status != ProjectStatus.Completed)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Update feedback failed",$"Project with id {updateDTO.ProjectId} is not completed"));
                }
                if(project.ClientId != _currenUserService.AccountId)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Update feedback failed", $"You must be the client of project with id {project.ProjectId} to update this feedback"));
                }
                var feedback = await _unitOfWork.GetRepo<Feedback>().GetSingleAsync(new QueryOptions<Feedback>
                {
                    Predicate = f => f.ProjectId == updateDTO.ProjectId
                });
                if(feedback == null)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Update feedback failed", "There is feedback in this project"));
                }
                _mapper.Map(updateDTO, feedback);
                await _unitOfWork.GetRepo<Feedback>().UpdateAsync(feedback);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(_mapper.Map<FeedbackDTO>(feedback));
            }
            catch(Exception e)
            {
                return Result.Failure<FeedbackDTO>(new Error("Failed to update feedback",$"{e.Message}"));
            }
        }
        public async Task<Result> DeleteFeedback(long projectId)
        {
            try
            {
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
                {
                    Predicate = p => p.ProjectId == projectId
                });
                if(project == null)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Delete feedback failed",$"Project with id {projectId} not found"));
                }
                if(project.Status != ProjectStatus.Completed)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Delete feedback failed",$"Project with id {projectId} is not completed"));
                }
                if(project.ClientId != _currenUserService.AccountId)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Delete feedback failed", $"You must be the client of project with id {project.ProjectId} to update this feedback"));
                }
                var feedback = await _unitOfWork.GetRepo<Feedback>().GetSingleAsync(new QueryOptions<Feedback>
                {
                    Predicate = f => f.ProjectId == projectId
                });
                if(feedback == null)
                {
                    return Result.Failure<FeedbackDTO>(new Error("Delete feedback failed", "There is feedback in this project"));
                }
                await _unitOfWork.GetRepo<Feedback>().DeleteAsync(feedback);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success($"Feedback of prject with id {project.ProjectId} is deleted");
            }
            catch(Exception e)
            {
                return Result.Failure<FeedbackDTO>(new Error("Delete feedback failed",$"{e.Message}"));
            }
        }
    }
}