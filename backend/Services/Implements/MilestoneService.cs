using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Milestone;
using Helpers.HelperClasses;
using Microsoft.Extensions.Configuration;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Implements
{
    public class MilestoneService : IMilestoneService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly IProjectRepository _projectRepository;
        private readonly IMilestoneRepository _milestoneRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly ITransactionRepository _transactionRepository;

        //private readonly IConfiguration _configuration;
        private readonly IAdminConfigService _adminConfigService;
        private readonly IMapper _mapper;

        public MilestoneService(
            //IUnitOfWork unitOfWork,
            IProjectRepository projectRepository,
            IMilestoneRepository miletoneRepository,
            IAccountRepository accountRepository,
            ITransactionRepository transactionRepository,
            IAdminConfigService adminConfigService,
            //IConfiguration configuration,
            IMapper mapper
        )
        {
            //_unitOfWork = unitOfWork;
            _projectRepository = projectRepository;
            _milestoneRepository = miletoneRepository;
            _accountRepository = accountRepository;
            _transactionRepository = transactionRepository;
            //_configuration = configuration;
            _adminConfigService = adminConfigService;
            _mapper = mapper;
        }

        public async Task<Result<MilestoneDTO>> CreateMilestoneAsync(
            CreateMilestoneDTO createMilstoneDTO
        )
        {
            try
            {
                //var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
                //{
                //    Predicate = p => p.ProjectId == createMilstoneDTO.ProjectId
                //});
                var project = await _projectRepository.GetSingleByIdAsync(
                    createMilstoneDTO.ProjectId
                );

                if (project == null)
                {
                    return Result.Failure<MilestoneDTO>(
                        new Error(
                            "Project not found",
                            $"Project with project id {createMilstoneDTO.ProjectId}"
                        )
                    );
                }
                if (string.IsNullOrWhiteSpace(createMilstoneDTO.MilestoneName))
                {
                    return Result.Failure<MilestoneDTO>(
                        new Error("Create milestone failed", "Milestone name can't be empty")
                    );
                }
                if (createMilstoneDTO.Deadline < DateTime.UtcNow)
                {
                    return Result.Failure<MilestoneDTO>(
                        new Error(
                            "Create milestone failed",
                            "Deadline must be greater than current date"
                        )
                    );
                }
                if (createMilstoneDTO.Amount <= 0)
                {
                    return Result.Failure<MilestoneDTO>(
                        new Error("Create milestone failed", "Amount must be greater than 0")
                    );
                }
                if (createMilstoneDTO.Amount > project.EstimateBudget)
                {
                    return Result.Failure<MilestoneDTO>(
                        new Error(
                            "Create milestone failed",
                            "Amount must be less than or equal to project budget"
                        )
                    );
                }
                var milestone = _mapper.Map<Milestone>(createMilstoneDTO);
                milestone.Status = MilestoneStatus.NotStarted;

                //var result = await _unitOfWork.GetRepo<Milestone>().CreateAsync(milestone);
                //await _unitOfWork.SaveChangesAsync();
                var result = await _milestoneRepository.CreateMilestoneAsync(milestone);

                return Result.Success(_mapper.Map<MilestoneDTO>(result));
            }
            catch (Exception e)
            {
                return Result.Failure<MilestoneDTO>(
                    new Error("Create milestone failed", $"{e.Message}")
                );
            }
        }

        public Task<bool> DeleteMilestoneAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<MilestoneDTO>> FinishMileStone(
            FinishMilestoneDTO finishMilestoneDTO
        )
        {
            try
            {
                //<===Milestone query===>
                //var queryOptions = new QueryBuilder<Milestone>()
                //.WithTracking(true)
                //.WithInclude(m => m.Project)
                //.WithPredicate(a => a.MilestoneId == finishMilestoneDTO.milestoneId) // Filter by ID
                //.Build();
                //var milestone = await _unitOfWork.GetRepo<Milestone>().GetSingleAsync(queryOptions);
                var milestone = await _milestoneRepository.GetSingleByIdAsync(
                    finishMilestoneDTO.milestoneId
                );

                if (milestone == null)
                {
                    return Result.Failure<MilestoneDTO>(
                        new Error(
                            "Milestone not found",
                            $"Milestone with id {finishMilestoneDTO.milestoneId}"
                        )
                    );
                }

                switch (finishMilestoneDTO.milestoneStatus)
                {
                    case MilestoneStatus.Cancelled:
                        milestone.Status = MilestoneStatus.Cancelled;
                        //await _unitOfWork.GetRepo<Milestone>().UpdateAsync(milestone);
                        //await _unitOfWork.SaveChangesAsync();
                        await _milestoneRepository.UpdateMilestoneAsync(milestone);

                        break;
                    case MilestoneStatus.Completed:
                        //<===Client query===>
                        //var clientQueryOptions = new QueryBuilder<Account>()
                        //    .WithTracking(true)
                        //    .WithPredicate(p => p.AccountId == milestone.Project.ClientId)
                        //    .Build();
                        //var client = await _unitOfWork.GetRepo<Account>().GetSingleAsync(clientQueryOptions);
                        var client = await _accountRepository.GetSingleByAccountIdAsync(
                            milestone.Project.ClientId
                        );

                        //<===Freelancer Query===>
                        //var freelancerQueryOptions = new QueryBuilder<Account>()
                        //    .WithTracking(true)
                        //    .WithPredicate(a => a.AccountId == milestone.Project.FreelancerId)
                        //    .Build();
                        //var freelancer = await _unitOfWork.GetRepo<Account>().GetSingleAsync(freelancerQueryOptions);
                        var freelancer = await _accountRepository.GetSingleByAccountIdAsync(
                            milestone.Project.FreelancerId
                        );

                        //<==Project Query==>
                        //var projectQueryOptions = new QueryBuilder<Project>()
                        //    .WithTracking(true)
                        //    .WithInclude(p => p.Milestones)
                        //    .WithPredicate(p => p.ProjectId == milestone.Project.ProjectId)
                        //    .Build();
                        //var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(projectQueryOptions);
                        var project = await _projectRepository.GetSingleByIdAsync(
                            milestone.Project.ProjectId
                        );

                        //<==Create transaction==>
                        var clientTransaction = new Transaction()
                        {
                            AccountId = client.AccountId,
                            CreatedAt = DateTime.UtcNow,
                            Amount = milestone.Project.EstimateBudget * milestone.PayAmount / 100,
                            Status = TransactionStatus.Pending,
                            Detail =
                                "Payment for Milestone "
                                + milestone.MilestoneId
                                + ": "
                                + milestone.MilestoneName
                                + " of project"
                                + milestone.Project.ProjectId
                                + ": "
                                + milestone.Project.ProjectName
                                + " for freelancer "
                                + freelancer.AccountId
                                + ": "
                                + freelancer.Name,
                            Type = TransactionType.Payment,
                        };
                        var freelancerTransaction = new Transaction()
                        {
                            AccountId = freelancer.AccountId,
                            CreatedAt = DateTime.UtcNow,
                            Amount = milestone.Project.EstimateBudget * milestone.PayAmount / 100,
                            Status = TransactionStatus.Pending,
                            Detail =
                                "Earning from Milestone "
                                + milestone.MilestoneId
                                + ": "
                                + milestone.MilestoneName
                                + " of project"
                                + milestone.Project.ProjectId
                                + ": "
                                + milestone.Project.ProjectName,
                            Type = TransactionType.Earnings,
                        };
                        //await _unitOfWork.GetRepo<Transaction>().CreateAllAsync(new List<Transaction> { freelancerTransaction, clientTransaction });
                        //await _unitOfWork.SaveChangesAsync();
                        await _transactionRepository.CreateAllTransationAsync(
                            new List<Transaction> { freelancerTransaction, clientTransaction }
                        );

                        //<==Change credit==>
                        client.LockCredit -=
                            milestone.Project.EstimateBudget * milestone.PayAmount / 100;
                        client.TotalCredit -=
                            milestone.Project.EstimateBudget * milestone.PayAmount / 100;

                        freelancer.TotalCredit +=
                            milestone.Project.EstimateBudget * milestone.PayAmount / 100;
                        //<===TODO: update reputation point==>
                        var checkDealine = CheckDeadlineStatus(
                            finishMilestoneDTO.UpdateDate,
                            milestone.DeadlineDate
                        );
                        int reputationPoint;
                        switch (checkDealine)
                        {
                            case -1:
                                //if (!int.TryParse(_configuration["ReputationPolicy:BeforeDeadline"], out reputationPoint))
                                //{
                                //    reputationPoint = 150;
                                //}
                                reputationPoint = _adminConfigService
                                    .GetConfig()
                                    .ReputationPolicy.BeforeDeadline;
                                freelancer.ReputationPoint += reputationPoint;
                                break;
                            case 0:
                                //if (!int.TryParse(_configuration["ReputationPolicy:RightDeadline"], out reputationPoint))
                                //{
                                //    reputationPoint = 100;
                                //}
                                reputationPoint = _adminConfigService
                                    .GetConfig()
                                    .ReputationPolicy.RightDeadline;
                                freelancer.ReputationPoint += reputationPoint;
                                break;
                            case 1:
                                //if (!int.TryParse(_configuration["ReputationPolicy:EarlylateDeadline"], out reputationPoint))
                                //{
                                //    reputationPoint = 50;
                                //}
                                reputationPoint = _adminConfigService
                                    .GetConfig()
                                    .ReputationPolicy.EarlylateDeadline;
                                freelancer.ReputationPoint -= reputationPoint;
                                break;
                            case 2:
                                //if (!int.TryParse(_configuration["ReputationPolicy:LateDeadline"], out reputationPoint))
                                //{
                                //    reputationPoint = 150;
                                //}
                                reputationPoint = _adminConfigService
                                    .GetConfig()
                                    .ReputationPolicy.LateDeadline;
                                freelancer.ReputationPoint -= reputationPoint;
                                break;
                            default:
                                break;
                        }

                        //await _unitOfWork.GetRepo<Account>().UpdateAsync(client);
                        //await _unitOfWork.GetRepo<Account>().UpdateAsync(freelancer);
                        //await _unitOfWork.SaveChangesAsync();
                        await _accountRepository.UpdateAsync(client);
                        await _accountRepository.UpdateAsync(freelancer);

                        //<===Change Transaction status===>
                        clientTransaction.Status = TransactionStatus.Completed;
                        freelancerTransaction.Status = TransactionStatus.Completed;

                        //await _unitOfWork.GetRepo<Transaction>().UpdateAsync(freelancerTransaction);
                        //await _unitOfWork.GetRepo<Transaction>().UpdateAsync(clientTransaction);
                        //await _unitOfWork.SaveChangesAsync();
                        await _transactionRepository.UpdateAsync(freelancerTransaction);
                        await _transactionRepository.UpdateAsync(clientTransaction);

                        //<===Change Milestone status===>
                        milestone.Status = MilestoneStatus.Completed;

                        //await _unitOfWork.GetRepo<Milestone>().UpdateAsync(milestone);
                        //await _unitOfWork.SaveChangesAsync();
                        await _milestoneRepository.UpdateMilestoneAsync(milestone);

                        //<==Check for Project==>
                        //If all mile stone is complete => update project status
                        if (isProjectComplete(project))
                        {
                            project.Status = ProjectStatus.Completed;

                            //if (!int.TryParse(_configuration["ReputationPolicy:CompleteProject"], out reputationPoint))
                            //{
                            //    reputationPoint = 200;
                            //}
                            reputationPoint = _adminConfigService
                                .GetConfig()
                                .ReputationPolicy.CompleteProject;
                            client.ReputationPoint += reputationPoint;

                            //await _unitOfWork.GetRepo<Account>().UpdateAsync(client);
                            //await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
                            //await _unitOfWork.SaveChangesAsync();
                            await _accountRepository.UpdateAsync(client);
                            await _projectRepository.UpdateAsync(project);
                        }
                        break;
                    default:
                        return Result.Failure<MilestoneDTO>(
                            new Error("Status not found", $"Only Cancalled and Complete input")
                        );
                }
                return _mapper.Map<MilestoneDTO>(milestone);
            }
            catch (Exception e)
            {
                return Result.Failure<MilestoneDTO>(
                    new Error("Finish milestone failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<IEnumerable<MilestoneDTO>>> GetAllMilestoneAsync()
        {
            try
            {
                //var milestones = await _unitOfWork.GetRepo<Milestone>().GetAllAsync(new QueryOptions<Milestone>());
                var milestones = await _milestoneRepository.GetAllMilestonesAsync();

                return Result.Success(milestones.Select(_mapper.Map<MilestoneDTO>));
            }
            catch (Exception e)
            {
                return Result.Failure<IEnumerable<MilestoneDTO>>(
                    new Error("Get all milestone failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<MilestoneDTO>> GetMilestoneByProjectIdAsync(long id)
        {
            try
            {
                //var queryOptions = new QueryOptions<Milestone>
                //{
                //    Predicate = m => m.ProjectId == id
                //};
                //var milestone = await _unitOfWork.GetRepo<Milestone>().GetSingleAsync(queryOptions);
                var milestone = await _milestoneRepository.GetSingleByProjectIdAsync(id);

                if (milestone == null)
                {
                    return Result.Failure<MilestoneDTO>(
                        new Error("Milestone not found", $"Milestone with project id {id}")
                    );
                }
                return Result.Success(_mapper.Map<MilestoneDTO>(milestone));
            }
            catch (Exception e)
            {
                return Result.Failure<MilestoneDTO>(
                    new Error("Get milestone by project id failed", $"{e.Message}")
                );
            }
        }

        public async Task<Result<MilestoneDTO>> UpdateMilestoneAsync(
            UpdateMilestoneDTO updateMilestoneDTO,
            long milestoneId
        )
        {
            try
            {
                //var queryOptions = new QueryBuilder<Milestone>()
                //.WithTracking(true)
                //.WithPredicate(a => a.MilestoneId == milestoneId) // Filter by ID
                //.Build();
                //var milestone = await _unitOfWork.GetRepo<Milestone>().GetSingleAsync(queryOptions);
                var milestone = await _milestoneRepository.GetSingleByIdAsync(milestoneId);

                if (milestone == null)
                {
                    return Result.Failure<MilestoneDTO>(
                        new Error("Milestone not found", $"Milestone with id {milestoneId}")
                    );
                }
                _mapper.Map(updateMilestoneDTO, milestone);

                //await _unitOfWork.GetRepo<Milestone>().UpdateAsync(milestone);
                //await _unitOfWork.SaveChangesAsync();
                await _milestoneRepository.UpdateMilestoneAsync(milestone);

                return _mapper.Map<MilestoneDTO>(milestone);
            }
            catch (Exception e)
            {
                return Result.Failure<MilestoneDTO>(
                    new Error("Update milestone failed", $"{e.Message}")
                );
            }
        }

        public bool isProjectComplete(Project project)
        {
            return project.Milestones.All(m => m.Status == MilestoneStatus.Completed);
        }

        public int CheckDeadlineStatus(DateTime finishDate, DateTime deadlineDate)
        {
            TimeSpan difference = finishDate.Date - deadlineDate.Date;

            if (difference.TotalDays < 0)
                return -1; //early
            else if (difference.TotalDays == 0)
                return 0; //right deadline
            else if (difference.TotalDays < 1)
                return 1; //early late for deadline
            else
                return 2; //too late for deadline
        }
    }
}
