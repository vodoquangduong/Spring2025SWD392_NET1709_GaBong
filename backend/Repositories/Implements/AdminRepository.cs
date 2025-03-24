using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Admin;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class AdminRepository : IAdminRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        public AdminRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Account>> GetTopTenReputation()
        {
            var queryOptions = new QueryBuilder<Account>()
                .WithTracking(false)
                .WithPredicate(a => a.Status == AccountStatus.Active)
                .WithOrderBy(a => a.OrderByDescending(a => a.ReputationPoint))
                .Build();
            var accounts = await _unitOfWork.GetRepo<Account>().GetAllAsync(queryOptions);
            return accounts.Take(10);
        }
        public async Task<int> GetTotalFreelancer()
        {
            var queryOptions = new QueryBuilder<Account>()
                .WithTracking(false)
                .WithPredicate(a => a.Status == AccountStatus.Active && a.Role == AccountRole.Freelancer)
                .Build();
            var accounts = await _unitOfWork.GetRepo<Account>().GetAllAsync(queryOptions);
            return accounts.Count();
        }
        public async Task<IEnumerable<Transaction>> GetRevenueList(DateTime? startDate = null, DateTime? endDate = null)
        {
            // Convert dates to UTC only if they have values
            var utcStartDate = startDate.HasValue ? DateTime.SpecifyKind(startDate.Value, DateTimeKind.Utc) : (DateTime?)null;
            var utcEndDate = endDate.HasValue ? DateTime.SpecifyKind(endDate.Value, DateTimeKind.Utc) : (DateTime?)null;

            var queryOptions = new QueryBuilder<Transaction>()
                .WithTracking(false)
                .WithPredicate(t => t.Status == TransactionStatus.Completed
                                && (t.Type == TransactionType.Fee || t.Type == TransactionType.Refund)
                                && (utcStartDate == null || t.CreatedAt >= utcStartDate)
                                && (utcEndDate == null || t.CreatedAt <= utcEndDate))
                .WithOrderBy(t => t.OrderByDescending(t => t.CreatedAt))
                .Build();

            return await _unitOfWork.GetRepo<Transaction>().GetAllAsync(queryOptions);
        }
        public async Task<decimal> GetTotalRevenue(DateTime? startDate = null, DateTime? endDate = null)
        {
            var queryOptions = new QueryBuilder<Transaction>()
                .WithTracking(false)
                .WithPredicate(t => t.Status == TransactionStatus.Completed
                                && (startDate == null || t.CreatedAt >= startDate)
                                && (endDate == null || t.CreatedAt <= endDate)
                                && (t.Type == TransactionType.Fee || t.Type == TransactionType.Refund))
                .Build();
            
            var transactions = await _unitOfWork.GetRepo<Transaction>().GetAllAsync(queryOptions);
            var totalFee = transactions.Where(t => t.Type == TransactionType.Fee)
                                    .Sum(t => t.Amount);
            var totalRefund = transactions.Where(t => t.Type == TransactionType.Refund)
                                    .Sum(t => t.Amount);
            var totalRevenue = totalFee - totalRefund;
            return totalRevenue;
        }
        public async Task<int> GetProjectsByStatus(ProjectStatus? status = null)
        {
            var queryOption = new QueryBuilder<Project>()
                .WithTracking(false)
                .WithPredicate(p => status == null || p.Status == status)
                .Build();
            var projects = await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOption);
            return projects.Count();
        }
        public async Task<IEnumerable<RevenueGraphData>> GetRevenueGraph(DateTime startDate, DateTime endDate, string groupBy = "month")
        {
            // Convert input dates to UTC
            startDate = DateTime.SpecifyKind(startDate, DateTimeKind.Utc);
            endDate = DateTime.SpecifyKind(endDate, DateTimeKind.Utc);

            var baseQuery = await _unitOfWork.GetRepo<Transaction>()
                .GetAllAsync(new QueryBuilder<Transaction>()
                    .WithTracking(false)
                    .WithPredicate(t => t.Status == TransactionStatus.Completed
                                    && t.CreatedAt >= startDate
                                    && t.CreatedAt <= endDate
                                    && (t.Type == TransactionType.Fee || t.Type == TransactionType.Refund))
                    .Build());

            var result = groupBy.ToLower() switch
            {
                "day" => baseQuery
                    .GroupBy(t => t.CreatedAt.Date)
                    .Select(g => new RevenueGraphData
                    {
                        Date = DateTime.SpecifyKind(g.Key, DateTimeKind.Utc),
                        Revenue = g.Sum(t => t.Type == TransactionType.Fee ? t.Amount : 
                                           t.Type == TransactionType.Refund ? -t.Amount : 0)
                    }),

                "month" => baseQuery
                    .GroupBy(t => new { t.CreatedAt.Year, t.CreatedAt.Month })
                    .Select(g => new RevenueGraphData
                    {
                        Date = DateTime.SpecifyKind(new DateTime(g.Key.Year, g.Key.Month, 1), DateTimeKind.Utc),
                        Revenue = g.Sum(t => t.Type == TransactionType.Fee ? t.Amount : 
                                           t.Type == TransactionType.Refund ? -t.Amount : 0)
                    }),

                "year" => baseQuery
                    .GroupBy(t => t.CreatedAt.Year)
                    .Select(g => new RevenueGraphData
                    {
                        Date = DateTime.SpecifyKind(new DateTime(g.Key, 1, 1), DateTimeKind.Utc),
                        Revenue = g.Sum(t => t.Type == TransactionType.Fee ? t.Amount : 
                                           t.Type == TransactionType.Refund ? -t.Amount : 0)
                    }),

                _ => throw new ArgumentException("Invalid groupBy parameter. Use 'day', 'month', or 'year'")
            };

            return result.OrderBy(x => x.Date);
        }
           public async Task<int> GetTotalCompletedProjectsById(long accountId)
        {
            var queryOptions = new QueryBuilder<Project>()
                .WithTracking(false)
                .WithPredicate(p => (p.ClientId == accountId || p.FreelancerId == accountId) && p.Status == ProjectStatus.Completed)
                .Build();
            var projects = await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
            return projects.Count();
        }
        public async Task<int> GetTotalOngoingProjectsById(long accountId)
        {
            var queryOptions = new QueryBuilder<Project>()
            .WithTracking(false)
            .WithPredicate(p => (p.ClientId == accountId || p.FreelancerId == accountId) && p.Status == ProjectStatus.OnGoing)
            .Build();
            var projects = await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
            return projects.Count();
        }
    }
}