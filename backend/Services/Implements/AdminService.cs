using AutoMapper;
using BusinessObjects.Enums;
using Helpers.DTOs.Account;
using Helpers.DTOs.Admin;
using Helpers.DTOs.Transaction;
using Helpers.HelperClasses;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Implements
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;
        public AdminService(IAdminRepository adminRepository, IMapper mapper)
        {
            _adminRepository = adminRepository;
            _mapper = mapper;
        }
        public async Task<Result<IEnumerable<AccountDTO>>> GetTopTenReputation()
        {
            var topTenReputation = await _adminRepository.GetTopTenReputation();
            var topTenReputationDTO = _mapper.Map<IEnumerable<AccountDTO>>(topTenReputation);
            return Result.Success(topTenReputationDTO);
        }
        public async Task<Result<IEnumerable<RevenueGraphData>>> GetRevenueGraph(DateTime startDate, DateTime endDate, string groupBy = "month")
        {
            var revenueData = await _adminRepository.GetRevenueGraph(startDate, endDate, groupBy);
            return Result.Success(revenueData);
        }
        public async Task<Result<int>> GetTotalFreelancer()
        {
            int totalFreelancer = await _adminRepository.GetTotalFreelancer();
            return Result.Success(totalFreelancer);
        }
        public async Task<Result<int>> GetTotalPendingProjects()
        {
            int totalProjects = await _adminRepository.GetProjectsByStatus(ProjectStatus.Pending);
            return Result.Success(totalProjects);
        }
        public async Task<Result<int>> GetTotalVerifiedProjects()
        {
            int totalProjects = await _adminRepository.GetProjectsByStatus(ProjectStatus.Verified);
            return Result.Success(totalProjects);
        }
        public async Task<Result<IEnumerable<TransactionDTO>>> GetRevenueList(DateTime startDate, DateTime endDate)
        {
            var revenueList = await _adminRepository.GetRevenueList(startDate, endDate);
            var revenueListDTO = _mapper.Map<IEnumerable<TransactionDTO>>(revenueList);
            return Result.Success(revenueListDTO);
        }
        public async Task<Result<int>> GetTotalReVerifyProjects()
        {
            int totalProjects = await _adminRepository.GetProjectsByStatus(ProjectStatus.ReVerify);
            return Result.Success(totalProjects);
        }
        public async Task<Result<int>> GetTotalOnGoingProjects()
        {
            int totalProjects = await _adminRepository.GetProjectsByStatus(ProjectStatus.OnGoing);
            return Result.Success(totalProjects);
        }
        public async Task<Result<int>> GetTotalCompletedProjects()
        {
            int totalProjects = await _adminRepository.GetProjectsByStatus(ProjectStatus.Completed);
            return Result.Success(totalProjects);
        }
        public async Task<Result<decimal>> GetTotalRevenue(DateTime? startDate = null, DateTime? endDate = null)
        {
            decimal totalRevenue = await _adminRepository.GetTotalRevenue(startDate, endDate);
            return Result.Success(totalRevenue);
        }
    }
}