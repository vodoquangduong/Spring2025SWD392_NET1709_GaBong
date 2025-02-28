
using Helpers.DTOs.Report;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IReportService
    {
        Task<Result<ReportDTO>> CreateReportAsync(CreateReportDTO createReportDTO);
        Task<Result<ReportDTO>> GetReportByIdAsync(long reportId);
        Task<Result<IEnumerable<ReportDTO>>> GetAllReportsAsync();
    }
}