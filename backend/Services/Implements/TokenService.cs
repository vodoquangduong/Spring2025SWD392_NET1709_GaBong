using BusinessObjects.Models;
using Helpers.DTOs.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services.Implements
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _config = config;

            _key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _config["JWT:SigningKey"] ?? throw new InvalidOperationException()
                )
            );
        }
        public string CreateResetToken(ResetPasswordDTO resetPasswordDto)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, resetPasswordDto.Email),
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string CreateToken(Account account)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, account.Email),
                new Claim("name", account.Name),
                new Claim(ClaimTypes.Role, account.Role.ToString()),
                new Claim("accountId", account.AccountId.ToString()),
                new Claim("avatar", account.AvatarURL),
                new Claim("status", account.Status.ToString()),
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(3),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string CreateVerifyToken(RegisterDTO registerDto)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, registerDto.Email),
                new Claim("name", registerDto.Name),
                new Claim("password", registerDto.Password),
                new Claim("role", registerDto.Role.ToString()),
                new Claim("status", registerDto.Status.ToString())
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public RegisterDTO ParseToken(string verifyGmailToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwt = tokenHandler.ReadJwtToken(verifyGmailToken);
            string name = jwt.Claims.FirstOrDefault(c => c.Type == "name")?.Value ?? "";
            string password = jwt.Claims.FirstOrDefault(c => c.Type == "password")?.Value ?? "";
            string email = jwt.Claims.FirstOrDefault(c => c.Type == "email")?.Value ?? "";
            string role = jwt.Claims.FirstOrDefault(c => c.Type == "role")?.Value ?? "";
            string status = jwt.Claims.FirstOrDefault(c => c.Type == "status")?.Value ?? "";
            var registerDto = new RegisterDTO()
            {
                Name = name,
                Password = password,
                Email = email,
            };

            return registerDto;
        }
    }
}
