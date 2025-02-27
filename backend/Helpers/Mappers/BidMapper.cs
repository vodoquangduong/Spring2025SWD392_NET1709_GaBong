using BusinessObjects.Models;
using Helpers.DTOs.Bid;


namespace Helpers.Mappers
{
    public static class BidMapper
    {
        public static BidDTO ToBidDTO(this Bid bid)
        {
            if (bid == null) return new BidDTO();

            return new BidDTO
            {
                BidDescription = bid.BidDescription,
                BidId = bid.BidId,
                BidOffer = bid.BidOffer,
                BidOwnerId = bid.BidOwnerId,
                CreatedAt = bid.CreatedAt,
                BidOwner = bid.BidOwner.ToAccountDTO(),
            };
        }

        public static Bid ToBid(BidDTO bidDTO)
        {
            if (bidDTO == null) return new Bid();

            return new Bid
            {
                BidDescription = bidDTO.BidDescription,
                BidId = bidDTO.BidId,
                BidOffer = bidDTO.BidOffer,
                BidOwnerId = bidDTO.BidOwnerId,
                CreatedAt = bidDTO.CreatedAt
            };
        }
    }
}
