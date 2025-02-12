using BusinessObjects.Models;
using Helpers.DTOs.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
