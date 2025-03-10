using BusinessObjects.Models;
using Helpers.DTOs.Chat;

namespace Services.Interfaces
{
    public interface IMessageService
    {
        Task<IEnumerable<Messages>> GetChatRoomMessagesAsync(long chatRoomId);
        Task<Messages> CreateMessagesAsync(MessageDTO messageDTO);
    }
}
