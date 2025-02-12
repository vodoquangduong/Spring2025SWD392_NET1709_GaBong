using Helpers.DTOs.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResponse?> Login(LoginDTO loginDto);
        Task<AuthenticationResponse?> Register(RegisterDTO registerDto);

        Task<AuthenticationResponse?> VerifyGmail(string token);
        Task<AuthenticationResponse?> GetResetToken(ResetPasswordDTO resetPasswordDto);
        Task<AuthenticationResponse?> LoginGoogle(LoginGoogleDTO loginGoogleDto);
        Task<AuthenticationResponse?> RegisterGoogle(RegisterDTO registerGoogleDto);
        Task<AuthenticationResponse?> ResetPassword(string email, UpdatePasswordDTO updatePasswordDto
        );
    }
}
