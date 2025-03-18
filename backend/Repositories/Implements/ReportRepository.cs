using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class ReportRepository : IReportRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public ReportRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Report> CreateAsync(Report report)
        {
            var result = await _unitOfWork.GetRepo<Report>().CreateAsync(report);
            await _unitOfWork.SaveChangesAsync();

            return result;
        }

        public IQueryable<Report> GetAllPaging()
        {
            var queryOptions = new QueryBuilder<Report>()
            .WithTracking(false)
            .Build();
            var reports = _unitOfWork.GetRepo<Report>().Get(queryOptions);

            return reports;
        }

        public async Task<Report?> GetSingleByIdAsync(long reportId)
        {
            var queryOptions = new QueryBuilder<Report>()
            .WithTracking(false)
            .WithPredicate(r => r.ReportId == reportId)
            .Build();
            var report = await _unitOfWork.GetRepo<Report>().GetSingleAsync(queryOptions);

            return report;
        }
    }
}
