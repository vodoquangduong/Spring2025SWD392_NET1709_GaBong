using Helpers.DTOs.Query;
using Helpers.DTOs.Report;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;
        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateReportAsync([FromBody] CreateReportDTO createReportDTO)
        {
            var result = await _reportService.CreateReportAsync(createReportDTO);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllReportsAsync([FromQuery] Query query)
        {
            var result = await _reportService.GetAllReportsAsync(query.PageNumber, query.PageSize);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("{reportId}")]
        public async Task<IActionResult> GetReportByIdAsync([FromRoute] long reportId)
        {
            var result = await _reportService.GetReportByIdAsync(reportId);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
    }
}