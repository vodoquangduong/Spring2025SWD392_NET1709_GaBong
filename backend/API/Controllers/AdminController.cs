using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        [HttpGet("total-freelancer")]
        public async Task<IActionResult> GetTotalFreelancer()
        {
            var result = await _adminService.GetTotalFreelancer();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("total-pending-projects")]
        public async Task<IActionResult> GetTotalPendingProjects()
        {
            var result = await _adminService.GetTotalPendingProjects();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("total-verified-projects")]
        public async Task<IActionResult> GetTotalVerifiedProjects()
        {
            var result = await _adminService.GetTotalVerifiedProjects();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }   
        [HttpGet("total-reverify-projects")]    
        public async Task<IActionResult> GetTotalReVerifyProjects()
        {
            var result = await _adminService.GetTotalReVerifyProjects();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }   
        [HttpGet("total-ongoing-projects")] 
        public async Task<IActionResult> GetTotalOnGoingProjects()
        {
            var result = await _adminService.GetTotalOnGoingProjects();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }   
        [HttpGet("total-completed-projects")]   
        public async Task<IActionResult> GetTotalCompletedProjects()
        {
            var result = await _adminService.GetTotalCompletedProjects();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }   
        [HttpGet("total-revenue")]  
        public async Task<IActionResult> GetTotalRevenue()
        {
            var result = await _adminService.GetTotalRevenue();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }   
        [HttpGet("revenue-graph")]
        public async Task<IActionResult> GetRevenueGraph([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, [FromQuery] string groupBy = "month")
        {
            var result = await _adminService.GetRevenueGraph(startDate, endDate, groupBy);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }   
        [HttpGet("revenue-list")]
        public async Task<IActionResult> GetRevenueList([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var result = await _adminService.GetRevenueList(startDate, endDate);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("top-ten-reputation")]
        public async Task<IActionResult> GetTopTenReputation()
        {
            var result = await _adminService.GetTopTenReputation();
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }   
        [HttpGet("total-completed-projects-by-id")]
        public async Task<IActionResult> GetTotalCompletedProjectsById([FromQuery] long accountId)
        {
            var result = await _adminService.GetTotalCompletedProjectsById(accountId);
            return Ok(result);
        }
        [HttpGet("total-ongoing-projects-by-id")]
        public async Task<IActionResult> GetTotalOngoingProjectsById([FromQuery] long accountId)
        {
            var result = await _adminService.GetTotalOngoingProjectsById(accountId);
            return Ok(result);
        }
    }
}