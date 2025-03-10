using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Report;
using Helpers.HelperClasses;
using Helpers.Mappers;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class ReportService : IReportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;
        public ReportService(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
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
                var report = new Report
                {
                    ProjectId = createReportDTO.ProjectId,
                    SenderId = _currentUserService.AccountId,
                    Reason = createReportDTO.Reason,
                    CreatedAt = DateTime.UtcNow,
                    Status = ReportStatus.Pending
                };
                var result = await _unitOfWork.GetRepo<Report>().CreateAsync(report);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(result.ToReportDTO());
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
                var paginatedReports = await Pagination.ApplyPaginationAsync(reports, pageNumber, pageSize, report => report.ToReportDTO());
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
                return Result.Success(report.ToReportDTO());
            }
            catch (Exception e)
            {
                return Result.Failure<ReportDTO>(new Error("Get report by id failed", e.Message));
            }
        }
    }
}