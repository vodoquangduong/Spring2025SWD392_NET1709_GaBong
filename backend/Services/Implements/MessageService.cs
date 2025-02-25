using BusinessObjects.Models;
using Helpers.DTOs.Chat;
using Helpers.Mappers;
using Repositories.Queries;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implements
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork _unitOfWork;

        public MessageService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Messages>> GetChatRoomMessagesAsync(long chatRoomId)
        {
            var queryRoomMessage = new QueryBuilder<Messages>()
                .WithTracking(false)
                .WithPredicate(m => m.ChatRoomId.Equals(chatRoomId))
                .Build();
            return await _unitOfWork.GetRepo<Messages>().GetAllAsync(queryRoomMessage);
        }

        public async Task<Messages> CreateMessagesAsync(MessageDTO messageDTO)
        {
           var createdMessage = await _unitOfWork.GetRepo<Messages>().CreateAsync(messageDTO.ToMessage());
            await _unitOfWork.SaveChangesAsync();
            return createdMessage;
        }
    }
}
