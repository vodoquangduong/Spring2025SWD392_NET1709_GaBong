using BusinessObjects.Enums;
using Helpers.DTOs.Account;
using Helpers.DTOs.Admin;
using Helpers.DTOs.Transaction;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface IAdminService
    {
        Task<Result<IEnumerable<AccountDTO>>> GetTopTenReputation();
        Task<Result<int>> GetTotalFreelancer();
        Task<Result<int>> GetTotalPendingProjects();
        Task<Result<int>> GetTotalVerifiedProjects();
        Task<Result<int>> GetTotalReVerifyProjects();
        Task<Result<int>> GetTotalOnGoingProjects();
        Task<Result<int>> GetTotalCompletedProjects();
        Task<Result<decimal>> GetTotalRevenue(DateTime? startDate = null, DateTime? endDate = null);
        Task<Result<IEnumerable<RevenueGraphData>>> GetRevenueGraph(DateTime startDate, DateTime endDate, string groupBy = "month");
        Task<Result<IEnumerable<TransactionDTO>>> GetRevenueList(DateTime startDate, DateTime endDate);
        Task<Result<int>> GetTotalCompletedProjectsById(long accountId);
        Task<Result<int>> GetTotalOngoingProjectsById(long accountId);
        Task<Result<int>> GetPendingReports();
        Task<Result<int>> GetApprovedReports();
        Task<Result<int>> GetRejectedReports();
        Task<Result<int>> GetTotalReports();
    }
}