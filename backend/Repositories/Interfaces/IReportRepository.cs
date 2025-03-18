using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface IReportRepository
    {
        Task<Report> CreateAsync(Report report);
        Task<Report?> GetSingleByIdAsync(long reportId);
        IQueryable<Report> GetAllPaging();
    }
}
