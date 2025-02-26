using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Chat
{
    public class CreateChatRoomDTO
    {
        public long ClientId { get; set; }
        public long FreelancerId { get; set; }
        public string ChatRoomName { get; set; } = string.Empty;
    }
}
