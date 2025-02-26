using BusinessObjects.Models;
using Helpers.DTOs.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.Mappers
{
    public static class MessageMapper
    {
        public static MessageDTO ToMessageDTO(this Messages message)
        {
            if(message == null) return new MessageDTO();
            var messageDTO = new MessageDTO{
                SenderId = message.SenderId,
                ChatRoomId = message.ChatRoomId,
                MessageContent = message.MessageContent,
                SendAt = message.SendAt
            };
            return messageDTO;
        }

        public static Messages ToMessage(this MessageDTO messageDTO)
        {
            if (messageDTO == null) return new Messages();
            var messages = new Messages
            {
                SenderId = messageDTO.SenderId,
                ChatRoomId = messageDTO.ChatRoomId,
                MessageContent = messageDTO.MessageContent,
                SendAt = messageDTO.SendAt
            };
            return messages;
        }
    }
}
