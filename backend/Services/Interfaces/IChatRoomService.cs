using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IChatRoomService
    {
        Task<IEnumerable<ChatRoom>> GetChatRoomsByUserIdAsync(long accountId);
        Task<ChatRoom?> GetDmChatRoomAsync(long clientId, long freelancerId);
        Task<ChatRoom> CreateDmChatRoomAsync(long clientId, long freelancerId);
    }
}
