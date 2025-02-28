using Helpers.DTOs.Authentication;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        //private readonly IEmailSender _emailSender;

        public AuthenticationController(
           IAuthenticationService authenticationService
       //IEmailSender emailSender
       )
        {
            _authenticationService = authenticationService;
            //_emailSender = emailSender;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var token = await _authenticationService.Login(loginDto);
            if (token == null)
            {
                return Unauthorized("Email not found or password incorrect");
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
            //var result = _emailSender.SendVerifyEmail(
            //    registerDto.Email,
            //    registerDto.Name,
            //    verifyGmailToken.Token,
            //    "[DATJ Diamond] – Email verification"
            //);

            return Ok("Registration successful");
        }

    }
}
