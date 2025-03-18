using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BusinessObjects.Models
{
    [PrimaryKey("ChatRoomId", "AccountId")]
    public class RoomDetail
    {

        [Column("chat_room_id")]
        public long ChatRoomId { get; set; }

        [Column("account_id")]
        public long AccountId { get; set; }

        // Navigation Properties
        [ForeignKey("ChatRoomId")]
        [JsonIgnore]
        public virtual ChatRoom ChatRooms { get; set; } = null!;

        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; } = null!;
    }
}
