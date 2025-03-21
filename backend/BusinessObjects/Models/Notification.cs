using BusinessObjects.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjects.Models
{
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("notification_id")]
        public long NotificationId { get; set; }
        [Column("account_id")]
        public long AccountId { get; set; }
        [Column("type")]
        public NotificationType Type { get; set; }
        [Column("time")]
        public DateTime Time { get; set; }
        [Column("status")]
        public NotificationStatus Status { get; set; }
        [Column("content")]
        public string Content { get; set; } = string.Empty;
        // Navigation Property
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; } = null!;


    }
}