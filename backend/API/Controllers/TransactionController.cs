using Helpers.DTOs.Query;
using Helpers.DTOs.Transaction;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet("All Transation")]
        public async Task<IActionResult> GetAllTransactions([FromQuery] Query query)
        {
            var result = await _transactionService.GetAllTransactionAsync(
                query.PageNumber,
                query.PageSize
            );
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpGet("All transation by type")]
        public async Task<IActionResult> GetTransactionsByType(
            [FromQuery] Query query,
            [FromQuery] TransactionFilter filter)
        {
            var result = await _transactionService.GetTransactionByTypeAsync(
                query.PageNumber,
                query.PageSize,
                filter
            );
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction(
            [FromBody] CreateTransactionDTO createTransactionDTO
        )
        {
            var result = await _transactionService.CreateTransactionAsync(createTransactionDTO);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        /// <summary>
        /// Get all transaction of an account (For dashboard UI)
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        [HttpGet("{accountId}")]
        public async Task<IActionResult> GetTransactionByAccountId([FromRoute] long accountId)
        {
            var result = await _transactionService.GetTransactionByAccountIdAsync(accountId);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateTransaction([FromBody] UpdateTransactionDTO updateTransactionDTO)
        {
            var result = await _transactionService.UpdateTransactionAsync(updateTransactionDTO);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }


        /// <summary>
        /// Get all transaction of an account (For table list UI)
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        // [HttpGet("{accountId}")]
        // public async Task<IActionResult> GetTransactionByAccount([FromRoute] long accountId)
        // {
        //     var result = await _transactionService.GetTransactionByAccountAsync(accountId);
        //     if (result.IsFailure)
        //     {
        //         return Ok(result.Error);
        //     }
        //     return Ok(result.Value);
        // }
    }
}
