using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Report;
using Helpers.HelperClasses;
using Repositories.Queries;
using Services.Interfaces;
using AutoMapper;

namespace Services.Implements
{
    public class ReportService : IReportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;
        public ReportService(IUnitOfWork unitOfWork, ICurrentUserService currentUserService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }
        public async Task<Result<ReportDTO>> CreateReportAsync(CreateReportDTO createReportDTO)
        {
            try
            {
                var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
                {
                    Predicate = p => p.ProjectId == createReportDTO.ProjectId
                });
                if(project == null)
                {
                    return Result.Failure<ReportDTO>(new Error("Project not found", $"Project with project id {createReportDTO.ProjectId}"));
                }
                if(project.ClientId == _currentUserService.AccountId)
                {
                    return Result.Failure<ReportDTO>(new Error("You can't report your own project", $"Project with project id {createReportDTO.ProjectId}"));
                }
                if(project.Status == ProjectStatus.Completed)
                {
                    return Result.Failure<ReportDTO>(new Error("You can't report completed project", $"Project with project id {createReportDTO.ProjectId}"));
                }
                if(project.Status == ProjectStatus.Closed)
                {
                    return Result.Failure<ReportDTO>(new Error("You can't report closed project", $"Project with project id {createReportDTO.ProjectId}"));
                }
                if(string.IsNullOrWhiteSpace(createReportDTO.Reason))
                {
                    return Result.Failure<ReportDTO>(new Error("Reason can't be empty", $"Project with project id {createReportDTO.ProjectId}"));
                }
                var report = _mapper.Map<Report>(createReportDTO);
                report.SenderId = _currentUserService.AccountId;
                report.CreatedAt = DateTime.UtcNow;
                report.Status = ReportStatus.Pending;
                var result = await _unitOfWork.GetRepo<Report>().CreateAsync(report);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(_mapper.Map<ReportDTO>(result));
            }
            catch (Exception e)
            {
                return Result.Failure<ReportDTO>(new Error("Create report failed", e.Message)); 
            }
        }

        public async Task<Result<PaginatedResult<ReportDTO>>> GetAllReportsAsync(int pageNumber, int pageSize)
        {
            try
            {
                var queryOptions = new QueryBuilder<Report>()
                .WithTracking(false)
                .Build();
                var reports = _unitOfWork.GetRepo<Report>().Get(queryOptions);
                var paginatedReports = await Pagination.ApplyPaginationAsync(reports, pageNumber, pageSize, _mapper.Map<ReportDTO>);
                return Result.Success(paginatedReports);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<ReportDTO>>(new Error("Get all reports failed", e.Message));
            }
        }

        public async Task<Result<ReportDTO>> GetReportByIdAsync(long reportId)
        {
            try
            {
                var queryOptions = new QueryBuilder<Report>()
                .WithTracking(false)
                .WithPredicate(r => r.ReportId == reportId)
                .Build();
                var report = await _unitOfWork.GetRepo<Report>().GetSingleAsync(queryOptions);
                if(report == null)
                {
                    return Result.Failure<ReportDTO>(new Error("Report not found", $"Report with report id {reportId}"));
                }
                return Result.Success(_mapper.Map<ReportDTO>(report));
            }
            catch (Exception e)
            {
                return Result.Failure<ReportDTO>(new Error("Get report by id failed", e.Message));
            }
        }
    }
}