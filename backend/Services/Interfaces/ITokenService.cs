using BusinessObjects.Models;
using Helpers.DTOs.Authentication;

namespace Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Account account);
        string CreateVerifyToken(RegisterDTO registerDto);
        string CreateResetToken(ResetPasswordDTO resetPasswordDto, string role);
        RegisterDTO ParseToken(string verifyGmailToken);
    }
}
