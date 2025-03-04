using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Contract;
using Helpers.DTOs.Query;
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
                return Ok(result.Error);
            }
            return Ok(result);
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllContracts([FromQuery] Query query)
        {
            var result = await _contractService.GetAllContractAsync(
                query.PageNumber,
                query.PageSize
            );
            if (!result.IsSuccess)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpGet("{contractId}")]
        public async Task<IActionResult> GetContractById([FromRoute] long contractId)
        {
            var result = await _contractService.GetContractByIdAsync(contractId);
            if (!result.IsSuccess)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetContractByProjectId([FromRoute] long projectId)
        {
            var result = await _contractService.GetContractByIdAsync(projectId);
            if (!result.IsSuccess)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
    }
}
