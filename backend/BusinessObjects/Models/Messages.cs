using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        [ForeignKey("SenderId")]
        public virtual Account Sender { get; set; } = null!;
        [JsonIgnore]
        [ForeignKey("ChatRoomId")]
        public virtual ChatRoom ChatRoom { get; set; } = null!;

    }
}