using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.PayPal;
using Microsoft.AspNetCore.Mvc;
using PayPalCheckoutSdk.Payments;
using Services.Implements;
using Services.Interfaces;
using System.Globalization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PayPalController : ControllerBase
    {
        private readonly PayPalClient _payPalClient;
        private readonly IAccountService _accountService;
        private readonly ITransactionService _transactionService;

        public PayPalController(IAccountService accountService, ITransactionService transactionService, PayPalClient payPalClient)
        {
            _accountService = accountService;
            _transactionService = transactionService;
            _payPalClient = payPalClient;
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] PaymentRequest request)
        {
            await Console.Out.WriteLineAsync("Bat dau lay transaction");
            var transaction = _transactionService.GetTransactionByIdAsync(request.transactionId);
            await Console.Out.WriteLineAsync("Transaction Id: " + transaction.Result.TransactionId);
            await Console.Out.WriteLineAsync("Transaction Amount: " + transaction.Result.Amount);

            if (transaction == null)
            {
                return BadRequest(new { message = "Transaction not found." });
            }
            var amount = transaction.Result.Amount.ToString("F2", CultureInfo.InvariantCulture);
            Console.WriteLine("This amount: " + amount);
            var currency = "USD";


            try
            {
                var response = await _payPalClient.CreateOrder(
                    amount,
                    currency,
                    transaction.Result.TransactionId.ToString()
                );
                return Ok(response);
            }
            catch (Exception e)
            {
                var error = new { e.GetBaseException().Message };
                return BadRequest(error);
            }
        }

        [HttpPost("capture-order")]
        public async Task<IActionResult> CapturePaypalOrder([FromBody] Helpers.DTOs.PayPal.CaptureRequest transactionId)
        {
            try
            {
                var response = await _payPalClient.CaptureOrder(transactionId.OrderId);
                return Ok(response);
            }
            catch (Exception e)
            {
                var error = new { e.GetBaseException().Message };
                return BadRequest(error);
            }
        }

        [HttpPut("completePayment/{transactionId}")]
        public async Task<ActionResult> CompletePayment(
            CancellationToken cancellationToken,
            [FromRoute] long transactionId
        )
        {
            try
            {
                var response = await _transactionService.FinishPaymentAsync(transactionId);
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
