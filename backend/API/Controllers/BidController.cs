using Helpers.DTOs.Bid;
using Helpers.DTOs.Project;
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
        public async Task<IActionResult> GetAllBidsByProjectId([FromRoute] long projectId)
        {
            var bids = await _bidService.GetAllBidsByProjectIdAsync(projectId);
            var bidDTOs = bids.Select(bid => bid.ToBidDTO());
            return Ok(bidDTOs);
        }

        [HttpGet("freelancer/{freelancerId}")]
        public async Task<IActionResult> GetAllBidsByFreelancerId([FromRoute] long freelancerId)
        {
            var bids = await _bidService.GetAllBidsByFreelancerIdAsync(freelancerId);
            var bidDTOs = bids.Select(bid => bid.ToBidDTO());
            return Ok(bidDTOs);
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
