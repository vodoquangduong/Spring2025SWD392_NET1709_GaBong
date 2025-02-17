using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BusinessObjects.Enums;

namespace BusinessObjects.Models
{
    public class Portfolio
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("portfolio_id")]
        public long PortfolioId { get; set; }

        [Column("freelancer_id")]
        public long FreelancerId { get; set; }

        [Column("title")]
        public string Title { get; set; } = String.Empty;

        [Column("works")]
        public string Works { get; set; } = string.Empty;

        [Column("certificate")]
        public string Certificate { get; set; } = string.Empty;

        [Column("about")]
        public string About { get; set; } = string.Empty;

        [Column("status")]
        public PortfolioStatus Status { get; set; }

        // Navigation property for the related Account
        [ForeignKey("FreelancerId")]
        public virtual Account? Account { get; set; }
    }
}