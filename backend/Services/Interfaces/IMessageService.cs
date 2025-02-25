using BusinessObjects.Models;
using Helpers.DTOs.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IMessageService
    {
        Task<IEnumerable<Messages>> GetChatRoomMessagesAsync(long chatRoomId);
        Task<Messages> CreateMessagesAsync(MessageDTO messageDTO);
    }
}
