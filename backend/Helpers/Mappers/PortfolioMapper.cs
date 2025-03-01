using BusinessObjects.Models;
using Helpers.DTOs.Portfolio;
using Services.Interfaces.Portfolio;

namespace Helpers.Mappers
{
    public static class PortfolioMapper
    {
        public static PortfolioDTO ToPortfolioDTO(this Portfolio portfolio)
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
    }
}