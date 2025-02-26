using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Chat
{
    public class MessageDTO
    {
        public long SenderId { get; set; }
        public long ChatRoomId { get; set; }
        public string MessageContent { get; set; } = string.Empty;
        public DateTime SendAt { get; set; }
    }
}
