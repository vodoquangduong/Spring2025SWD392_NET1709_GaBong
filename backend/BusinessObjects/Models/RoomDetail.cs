using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

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
        [JsonIgnore]
        public virtual Account Account { get; set; } = null!;
    }
}
