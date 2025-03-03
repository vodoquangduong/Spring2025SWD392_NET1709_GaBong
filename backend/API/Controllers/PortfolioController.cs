using Helpers.DTOs.Portfolio;
using Helpers.DTOs.Query;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;
        public PortfolioController(IPortfolioService portfolioService)
        {
            _portfolioService = portfolioService;
        }
        [HttpPost]
        public async Task<IActionResult> CreatePortfolio([FromBody] CreatePortfolioDTO portfolioDto)
        {
            var result = await _portfolioService.CreatePortfolioAsync(portfolioDto);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPortfolio([FromQuery] Query query)
        {
            var result = await _portfolioService.GetAllPortfolioAsync(query.PageNumber, query.PageSize);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPortfolioById([FromRoute] long id)
        {
            var result = await _portfolioService.GetPortfolioByIdAsync(id);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("freelancer/{freelancerId}")]
        public async Task<IActionResult> GetPortfolioByFreelancerId([FromRoute] long freelancerId)
        {
            var result = await _portfolioService.GetPortfolioByFreelancerIdAsync(freelancerId);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpPut]
        public async Task<IActionResult> UpdatePortfolio([FromBody] UpdatePortfolioDTO updatePortfolioDto)
        {
            var result = await _portfolioService.UpdatePortfolioAsync(updatePortfolioDto);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpPut("verify/{portfolioId}")]
        public async Task<IActionResult> VerifyPortfolio([FromRoute] long portfolioId, [FromBody] VerifyPortfolioDTO verifyPortfolioDto)
        {
            var result = await _portfolioService.VerifyPortfolioAsync(portfolioId, verifyPortfolioDto);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpPut("freelancer-submit")]
        public async Task<IActionResult> SubmitPortfolio()
        {
            var result = await _portfolioService.SubmitPortfolioAsync();
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("public/{freelancerId}")]
        public async Task<IActionResult> GetPublicPortfolioByFreelancerId([FromRoute] long freelancerId)
        {
            var result = await _portfolioService.GetPublicPortfolioByFreelancerIdAsync(freelancerId);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("pending")]
        public async Task<IActionResult> GetPublicPortfolioPendingList([FromQuery] Query query)
        {
            var response = await _portfolioService.GetPublicPortfolioPendingList(query.PageNumber, query.PageSize);
            if (response.IsFailure)
            {
                return BadRequest(response.Error);
            }
            return Ok(response);
        }
        [HttpGet("verified")]
        public async Task<IActionResult> GetPublicPortfolioVerifiedList([FromQuery] Query query)
        {
            var response = await _portfolioService.GetPublicPortfolioVerifiedList(query.PageNumber, query.PageSize);
            if (response.IsFailure)
            {
                return BadRequest(response.Error);
            }
            return Ok(response);
        }
    }
}