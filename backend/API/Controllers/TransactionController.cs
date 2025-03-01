using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Payment_src.core.Payment.Service.Paypal.Model;
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
        private readonly PaypalClient _paypalClient;

        public TransactionController(ITransactionService transactionService, PaypalClient paypalClient)
        {
            _transactionService = transactionService;
            _paypalClient = paypalClient;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var result = await _transactionService.GetAllTransactionAsync();
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionDTO createTransactionDTO)
        {
            var result = await _transactionService.CreateTransactionAsync(createTransactionDTO);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionByAccountId([FromRoute] long id)
        {
            var result = await _transactionService.GetTransactionByAccountIdAsync(id);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }

        [HttpPost("capture-Paypal")]
        public async Task<ActionResult> CapturePaypalOrder(
            CancellationToken cancellationToken,
            string transactionId
        )
        {
            try
            {
                var response = await _paypalClient.CaptureOrder(transactionId);
                return Ok(response);
            }
            catch (Exception e)
            {
                var error = new { e.GetBaseException().Message };
                return BadRequest(error);
            }
        }
    }
}