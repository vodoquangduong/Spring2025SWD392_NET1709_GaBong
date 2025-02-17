using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;
using BusinessObjects.Enums;

namespace BusinessObjects.Models
{
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("transaction_id")]
        public long TransactionId { get; set; }
        [Column("account_id")]
        public long AccountId { get; set; }
        [Column("amount")]
        public long Amount { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("status")]
        public Enums.TransactionStatus Status { get; set; }
        [Column("type")]
        public TransactionType Type { get; set; }
        //navigation property
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; } = null!;
        
    }
}