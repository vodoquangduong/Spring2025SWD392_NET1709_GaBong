using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessObjects.Models
{
    public class Chat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("chat_id")]
        public long ChatId { get; set; }
        [Column("sender_id")]
        public long SenderId { get; set; }
        [Column("receiver_id")]
        public long ReceiverId { get; set; }
        [Column("message_content")]
        public string MessageContent { get; set; } = string.Empty;
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        //navigation property
        [ForeignKey("SenderId")]
        public virtual Account Sender { get; set; } = null!;
        [ForeignKey("ReceiverId")]
        public virtual Account Receiver {get; set;} = null!;
        
    }
}