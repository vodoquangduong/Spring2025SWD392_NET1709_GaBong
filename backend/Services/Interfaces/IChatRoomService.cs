using BusinessObjects.Models;
using Helpers.DTOs.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IChatRoomService
    {
        Task<IEnumerable<ChatRoom>> GetRoomDetailsBySharedChatRoomsAsync(long accountId);
        Task<IEnumerable<ChatRoom>> GetChatRoomsByUserIdAsync(long accountId);
        Task<ChatRoom?> GetDmChatRoomAsync(long clientId, long freelancerId);
        Task<ChatRoom> CreateDmChatRoomAsync(CreateChatRoomDTO createChatDTO);
    }
}
