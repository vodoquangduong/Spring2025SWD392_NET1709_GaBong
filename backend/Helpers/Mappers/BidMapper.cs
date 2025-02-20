using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Bid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.Mappers
{
    public static class BidMapper
    {
        public static BidDTO ToBidDTO(this Bid bid)
        {
            if (bid == null) return null;

            return new BidDTO
            {
                BidDescription = bid.BidDescription,
                BidId = bid.BidId,
                BidOffer = bid.BidOffer,
                BidOwnerId = bid.BidOwnerId,
                CreatedAt = bid.CreatedAt
            };
        }

        public static Bid ToBid(BidDTO bidDTO)
        {
            if (bidDTO == null) return null;

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
