using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;
using Helpers.DTOs.SkillPerform;

namespace Helpers.DTOs.Portfolio
{
    public class PublicPortfolioDTO
    {
        public long PortfolioId { get; set; }
        public long FreelancerId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Works { get; set; } = string.Empty;
        public string Certificate { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;
        public PortfolioStatus Status { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
         public string AvatarURL { get; set; } = string.Empty;
        public DateTime Birthday { get; set; } = DateTime.MinValue;
        public Gender Gender { get; set; }
        public string Nationality { get; set; } = string.Empty;
        public int ReputationPoint { get; set; } = 0;
        public List<SkillPerformDTO> SkillPerform { get; set; } = new List<SkillPerformDTO>();
    }
}