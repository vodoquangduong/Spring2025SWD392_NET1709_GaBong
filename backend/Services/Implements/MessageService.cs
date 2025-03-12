using BusinessObjects.Models;
using Helpers.DTOs.Chat;
using Helpers.Mappers;
using Repositories.Queries;
using Services.Interfaces;
using AutoMapper;

namespace Services.Implements
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public MessageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
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
           var createdMessage = await _unitOfWork.GetRepo<Messages>().CreateAsync(_mapper.Map<Messages>(messageDTO));
            await _unitOfWork.SaveChangesAsync();
            return createdMessage;
        }
    }
}
