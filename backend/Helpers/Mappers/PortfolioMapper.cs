using BusinessObjects.Models;
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
    }
}