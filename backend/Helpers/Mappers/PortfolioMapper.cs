using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Portfolio;
using Helpers.DTOs.SkillPerform;
using Services.Interfaces.Portfolio;
using System.Runtime.CompilerServices;

namespace Helpers.Mappers
{
    public static class PortfolioMapper
    {
        public static PortfolioDTO ToPortfolioDTO(this Portfolio portfolio, List<SkillPerform> skillPerform)
        {
            return new PortfolioDTO
            {
                PortfolioId = portfolio.PortfolioId,
                FreelancerId = portfolio.FreelancerId,
                Title = portfolio.Title,
                Works = portfolio.Works,
                Certificate = portfolio.Certificate,
                About = portfolio.About,
                Status = portfolio.Status,
                skillPerformDTOs = skillPerform.Select(s => s.ToSkillPerformDTO()).ToList()
            };
        }
        public static PublicPortfolioDTO ToPublicPortfolioDTO(this Portfolio portfolio)
        {
            if (portfolio == null) return null;

            return new PublicPortfolioDTO
            {
                PortfolioId = portfolio.PortfolioId,
                FreelancerId = portfolio.FreelancerId,
                Title = portfolio.Title,
                Works = portfolio.Works,
                Certificate = portfolio.Certificate,
                About = portfolio.About,
                Status = portfolio.Status,

                // Freelancer Information
                Name = portfolio.Account?.Name ?? string.Empty,
                Email = portfolio.Account?.Email ?? string.Empty,
                Phone = portfolio.Account?.Phone ?? string.Empty,
                Address = portfolio.Account?.Address ?? string.Empty,
                AvatarURL = portfolio.Account?.AvatarURL ?? string.Empty,
                Birthday = portfolio.Account?.Birthday ?? DateTime.MinValue,
                Gender = portfolio.Account?.Gender ?? default,
                Nationality = portfolio.Account?.Nationality ?? string.Empty,
                ReputationPoint = portfolio.Account?.ReputationPoint ?? 0,
            };
        }
        public static Portfolio ToPortfolio(this CreatePortfolioDTO createPortfolioDTO) 
        {
            return new Portfolio
            {
                    Title = createPortfolioDTO.Title,
                    Works = createPortfolioDTO.Works,
                    Certificate = createPortfolioDTO.Certificate,
                    About = createPortfolioDTO.About,
                    Status = PortfolioStatus.Modifying,
            };
        }
        public static void ToPortfolio(this Portfolio portfolio, UpdatePortfolioDTO updatePortfolioDTO)
        {
            portfolio.Title = updatePortfolioDTO.Title;
            portfolio.Works = updatePortfolioDTO.Works;
            portfolio.Certificate = updatePortfolioDTO.Certificate;
            portfolio.About = updatePortfolioDTO.About;
        }
    }
}