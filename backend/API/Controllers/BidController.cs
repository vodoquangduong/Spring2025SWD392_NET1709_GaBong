using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Bid;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly IBidService _bidService;

        public BidController(IBidService bidService)
        {
            _bidService = bidService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBid(CreateBidDTO bidDto)
        {
            var bid = await _bidService.CreateBidAsync(bidDto);
            return Ok(bid);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBids()
        {
            var bids = await _bidService.GetAllBidsAsync();
            return Ok(bids);
        }

    }
}