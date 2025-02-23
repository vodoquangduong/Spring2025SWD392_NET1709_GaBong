using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessObjects.Models
{
    public class Messages
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("message_id")]
        public long MessageId { get; set; }
        [Column("sender_id")]
        public long SenderId { get; set; }
        [Column("chat_room_id")]
        public long ChatRoomId { get; set; }
        [Column("message_content")]
        public string MessageContent { get; set; } = string.Empty;
        [Column("send_at")]
        public DateTime SendAt { get; set; }


        //navigation property
        [ForeignKey("SenderId")]
        public virtual Account Sender { get; set; } = null!;
        [ForeignKey("ChatRoomId")]
        public virtual ChatRoom ChatRoom {get; set;} = null!;
        
    }
}