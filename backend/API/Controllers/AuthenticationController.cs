using Helpers.DTOs.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMailSenderService _mailSender;

        public AuthenticationController(
            IAuthenticationService authenticationService,
            IMailSenderService emailSender
        )
        {
            _authenticationService = authenticationService;
            _mailSender = emailSender;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var token = await _authenticationService.Login(loginDto);
            if (token == null)
            {
                return Unauthorized("Email, password incorrect or account is banned");
            }
            return Ok(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var verifyGmailToken = await _authenticationService.Register(registerDto);
            if (verifyGmailToken == null)
            {
                return Unauthorized("Email already be used");
            }
            var result = _mailSender.SendVerifyEmail(
                registerDto.Email,
                registerDto.Name,
                verifyGmailToken.Token,
                "[GigsHub] – Email verification"
            );

            return Ok(result);
        }

        [HttpPost("verify-gmail")]
        public async Task<IActionResult> VerifyGmail()
        {
            try
            {
                if (HttpContext.Request.Headers.TryGetValue("Authorization", out var headerAuth))
                {
                    var verifyGmailToken = headerAuth
                        .First()
                        .Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)[1];
                    Console.WriteLine("token:" + verifyGmailToken);
                    var accessToken = await _authenticationService.VerifyGmail(verifyGmailToken);
                    if (accessToken == null)
                    {
                        return Unauthorized("Email already be used");
                    }
                    return Ok(accessToken);
                }
                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var resetToken = await _authenticationService.GetResetToken(resetPasswordDto);
            if (resetToken == null)
            {
                return Unauthorized("Email hasn't been registered");
            }
            var result = _mailSender.SendResetEmail(
                resetPasswordDto.Email,
                "",
                resetToken.Token,
                "[GigsHub] – Reset password verification"
            );

            return Ok(result);
        }

        [HttpPost("confirm-password")]
        [Authorize]
        public async Task<IActionResult> ConfirmPassword(
            [FromBody] UpdatePasswordDTO updatePasswordDto
        )
        {
            Console.WriteLine("email: " + User.FindFirst(ClaimTypes.Email)?.Value);
            var accessToken = await _authenticationService.ResetPassword(
                updatePasswordDto.Email,
                updatePasswordDto
            );
            if (accessToken == null)
            {
                return Unauthorized("Email already be used");
            }
            return Ok(accessToken);
        }
    }
}
