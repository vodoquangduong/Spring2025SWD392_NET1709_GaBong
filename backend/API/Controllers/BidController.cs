using Helpers.DTOs.Bid;
using Helpers.DTOs.Project;
using Helpers.DTOs.Query;
using Helpers.Mappers;
using Microsoft.AspNetCore.Mvc;
using Services.Implements;
using Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidService _bidService;
        private readonly ICurrentUserService _currentUserService;

        public BidController(IBidService bidService, ICurrentUserService currentUserService)
        {
            _bidService = bidService;
            _currentUserService = currentUserService;
        }

        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetAllBidsByProjectId([FromRoute] long projectId, [FromQuery] Query query)
        {
            var result = await _bidService.GetAllBidsByProjectIdAsync(projectId, query.PageNumber, query.PageSize);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpGet("freelancer/{freelancerId}")]
        public async Task<IActionResult> GetAllBidsByFreelancerId([FromRoute] long freelancerId, [FromQuery] Query query)
        {
            var result = await _bidService.GetAllBidsByFreelancerIdAsync(freelancerId, query.PageNumber, query.PageSize);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBid([FromBody] CreateBidDTO bid)
        {
            var createdBid = await _bidService.CreateBidAsync(bid, _currentUserService.AccountId);
            return Ok(createdBid);
        }

        // PUT api/<BidController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BidController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
