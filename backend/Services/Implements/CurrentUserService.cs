using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Services.Implements
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public long AccountId
        {
            get
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User.Claims
                    .FirstOrDefault(c => c.Type == "accountId");
                    
                if (userIdClaim == null)
                    throw new UnauthorizedAccessException("Account Id not found in token");

                return long.Parse(userIdClaim.Value);
            }
        }

        public string Email
        {
            get
            {
                return _httpContextAccessor.HttpContext?.User.Claims
                    .FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value 
                    ?? throw new UnauthorizedAccessException("Username not found in token");
            }
        }

        public string Role
        {
            get
            {
                return _httpContextAccessor.HttpContext?.User.Claims
                    .FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value 
                    ?? throw new UnauthorizedAccessException("Role not found in token");
            }
        }
        
    }
}