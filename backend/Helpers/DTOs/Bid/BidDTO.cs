﻿using Helpers.DTOs.Account;

namespace Helpers.DTOs.Bid
{
    public class BidDTO
    {
        public long BidId { get; set; }
        public long ProjectId { get; set; }
        public long BidOwnerId { get; set; }
        public decimal BidOffer { get; set; }
        public DateTime CreatedAt { get; set; }
        public string BidDescription { get; set; } = string.Empty;
        public AccountDTO BidOwner { get; set; } = null!;
    }
}
