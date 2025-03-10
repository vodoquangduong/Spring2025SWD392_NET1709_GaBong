using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BusinessObjects.Models
{
    public class ChatRoom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("chat_room_id")]
        public long ChatRoomID { get; set; }
 
        [Column("chat_room_name")]
        public string ChatRoomName { get; set; } = string.Empty;


        //Navigation Property
        [JsonIgnore]
        public virtual ICollection<Messages> Messages { get; set; } = new List<Messages>();
        public virtual ICollection<RoomDetail> RoomDetails { get; set; } = new List<RoomDetail>();
    }
}
