using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public long UserId
        {
            get
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User.Claims
                    .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                    
                if (userIdClaim == null)
                    throw new UnauthorizedAccessException("User ID not found in token");

                return long.Parse(userIdClaim.Value);
            }
        }

        public string UserName
        {
            get
            {
                return _httpContextAccessor.HttpContext?.User.Claims
                    .FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value 
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