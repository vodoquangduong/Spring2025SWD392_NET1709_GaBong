using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessObjects.Models
{
    public class Bid
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("bid_id")]
        public long BidId { get; set; }
        [Column("bid_owner_id")]
        public long BidOwnerId { get; set; }

        [Column("project_id")]
        public long ProjectId { get; set; }

        [Column("bid_offer")]
        public decimal BidOffer { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Column("bid_description")]
        public string BidDescription { get; set; } = string.Empty;
        
        // Navigation properties
        [ForeignKey("BidOwnerId")]
        [JsonIgnore]
        public Account BidOwner { get; set; } = null!;
        [ForeignKey("ProjectId")]
        public Project Project { get; set; } = null!;
    }
}