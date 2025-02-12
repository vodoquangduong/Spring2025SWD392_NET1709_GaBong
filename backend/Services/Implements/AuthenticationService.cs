using BusinessObjects.Models;
using Helpers.DTOs.Authentication;
using Helpers.HelperClasses;
using Microsoft.AspNetCore.Identity;
using Repositories.Interfaces;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implements
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ITokenService _tokenService;
        private readonly IAccountRepository _accountRepository;
        public AuthenticationService(ITokenService tokenService, IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
            _tokenService = tokenService;
        }
        public Task<AuthenticationResponse?> GetResetToken(ResetPasswordDTO resetPasswordDto)
        {
            throw new NotImplementedException();
        }

        public async Task<AuthenticationResponse?> Login(LoginDTO loginDto)
        {
            var account = await _accountRepository.GetAccountByEmailAsync(loginDto.Email);

            if (account == null)
                return null;

            bool isPasswordValid = PasswordHasher.VerifyPassword(
                loginDto.Password,
                account.Password
            );

            if (!isPasswordValid)
                return null;

            return new AuthenticationResponse { Token = _tokenService.CreateToken(account) };
        }

        public Task<AuthenticationResponse?> LoginGoogle(LoginGoogleDTO loginGoogleDto)
        {
            throw new NotImplementedException();
        }

        public async Task<AuthenticationResponse?> Register(RegisterDTO registerDto)
        {
            var existingAccount = await _accountRepository.GetAccountByEmailAsync(
                registerDto.Email
            );
            if (existingAccount != null)
            {
                return null;
            }
            var account = await _accountRepository.CreateAccountAsync(registerDto);
            return new AuthenticationResponse()
            {
                Token = _tokenService.CreateToken(account)
            };
        }



        public Task<AuthenticationResponse?> RegisterGoogle(RegisterDTO registerGoogleDto)
        {
            throw new NotImplementedException();
        }

        public Task<AuthenticationResponse?> ResetPassword(string email, UpdatePasswordDTO updatePasswordDto)
        {
            throw new NotImplementedException();
        }

        public Task<AuthenticationResponse?> VerifyGmail(string token)
        {
            throw new NotImplementedException();
        }
    }
}
