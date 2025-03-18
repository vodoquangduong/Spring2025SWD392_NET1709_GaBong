using BusinessObjects.Enums;
using Helpers.DTOs.SkillPerform;

namespace Services.Interfaces.Portfolio
{
    public class PortfolioDTO
    {
        public long PortfolioId { get; set; }
        public long FreelancerId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Works { get; set; } = string.Empty;
        public string Certificate { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;
        public PortfolioStatus Status { get; set; }
        public List<SkillPerformDTO> SkillPerformDTOs { get; set; } = new List<SkillPerformDTO>();
    }
}