using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Contract;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContractController : ControllerBase
    {
        private readonly IContractService _contractService;
        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }
        [HttpPost()]
        public async Task<IActionResult> CreateContract([FromBody] CreateContractDTO contract)
        {
            var result = await _contractService.CreateContractAsync(contract);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Error);
            }
            return Ok(result);
        }
        [HttpGet()]
        public async Task<IActionResult> GetAllContracts()
        {
            var result = await _contractService.GetAllContractAsync();
            if(!result.IsSuccess)
            {
                return BadRequest(result.Error);
            }
            return Ok(result);
        }
        [HttpGet("{contractId}")]
        public async Task<IActionResult> GetContractById([FromRoute] long contractId)
        {
            var result = await _contractService.GetContractByIdAsync(contractId);
            if(!result.IsSuccess)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
    }
}