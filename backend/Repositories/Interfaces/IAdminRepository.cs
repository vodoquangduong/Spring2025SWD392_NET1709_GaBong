using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Admin;

namespace Repositories.Interfaces
{
    public interface IAdminRepository
    {
        Task<IEnumerable<Account>> GetTopTenReputation();
        Task<int> GetTotalFreelancer();
        Task<int> GetProjectsByStatus(ProjectStatus? status = null);
        Task<decimal> GetTotalRevenue(DateTime? startDate = null, DateTime? endDate = null);
        Task<IEnumerable<RevenueGraphData>> GetRevenueGraph(DateTime startDate, DateTime endDate, string groupBy = "month");
        Task<IEnumerable<Transaction>> GetRevenueList(DateTime? startDate = null, DateTime? endDate = null);
    }
}