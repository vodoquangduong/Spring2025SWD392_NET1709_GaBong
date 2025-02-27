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
        //========================
        //FIELD                 ||
        //========================
        private readonly ITokenService _tokenService;
        private readonly IAccountService _accountService;

        //========================
        //CONSTRUCTOR           ||
        //========================
        public AuthenticationService(ITokenService tokenService, IAccountService accountService)
        {
            _accountService = accountService;
            _tokenService = tokenService;
        }


        public async Task<AuthenticationResponse?> Login(LoginDTO loginDto)
        {
            var account = await _accountService.GetAccountByEmailAsync(loginDto.Email);

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

        
        public async Task<AuthenticationResponse?> LoginGoogle(LoginGoogleDTO loginGoogleDto)
        {
            var existingAccount = await _accountService.GetAccountByEmailAsync(
               loginGoogleDto.Email
           );
            if (existingAccount == null)
            {
                return null;
            }
            return new AuthenticationResponse()
            {
                Token = _tokenService.CreateToken(existingAccount)
            };
        }

        public async Task<AuthenticationResponse?> Register(RegisterDTO registerDto)
        {
            var existingAccount = await _accountService.GetAccountByEmailAsync(registerDto.Email);
            if (existingAccount != null)
            {
                return null;
            }
            var account = await _accountService.CreateAccount(registerDto);
            return new AuthenticationResponse()
            {
                Token = _tokenService.CreateToken(account)
            };
        }

        public async Task<AuthenticationResponse?> RegisterGoogle(RegisterDTO registerGoogleDto)
        {
            var existingAccount = await _accountService.GetAccountByEmailAsync(
               registerGoogleDto.Email
           );
            if (existingAccount != null)
            {
                return null;
            }
            var account = await _accountService.CreateAccount(registerGoogleDto);
            return new AuthenticationResponse { Token = _tokenService.CreateToken(account) };
        }

        public async Task<AuthenticationResponse?> VerifyGmail(string token)
        {
            var registerDto = _tokenService.ParseToken(token);
            var existingAccount = await _accountService.GetAccountByEmailAsync(registerDto.Email);
            if (existingAccount != null)
            {
                return null;
            }
            var account = await _accountService.CreateAccount(registerDto);
            return new AuthenticationResponse { Token = _tokenService.CreateToken(account) };
        }

        public async Task<AuthenticationResponse?> GetResetToken(ResetPasswordDTO resetPasswordDto)
        {
            var existingAccount = await _accountService.GetAccountByEmailAsync(
                resetPasswordDto.Email
            );
            if (existingAccount == null)
            {
                return null;
            }
            return new AuthenticationResponse()
            {
                Token = _tokenService.CreateResetToken(resetPasswordDto)
            };
        }

        public async Task<AuthenticationResponse?> ResetPassword(string email, UpdatePasswordDTO updatePasswordDto)
        {
            var existingAccount = await _accountService.GetAccountByEmailAsync(email);
            if (existingAccount == null)
            {
                return null;
            }
            var account = await _accountService.ResetPasswordAsync(
                existingAccount.AccountId,
                updatePasswordDto.Password
            );
            return new AuthenticationResponse()
            {
                Token = _tokenService.CreateToken(existingAccount)
            };
        }
    }
}
