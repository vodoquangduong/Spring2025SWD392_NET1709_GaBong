using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.Chat;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Implements
{
    public class MessageService : IMessageService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;
        public MessageService(
            //IUnitOfWork unitOfWork, 
            IMessageRepository messageRepository,
            IMapper mapper
            )
        {
            //_unitOfWork = unitOfWork;
            _messageRepository = messageRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Messages>> GetChatRoomMessagesAsync(long chatRoomId)
        {
            //var queryRoomMessage = new QueryBuilder<Messages>()
            //    .WithTracking(false)
            //    .WithPredicate(m => m.ChatRoomId.Equals(chatRoomId))
            //    .Build();
            //return await _unitOfWork.GetRepo<Messages>().GetAllAsync(queryRoomMessage);
            return await _messageRepository.GetAllByChatRoomIdAsync(chatRoomId);
        }

        public async Task<Messages> CreateMessagesAsync(MessageDTO messageDTO)
        {
            //var createdMessage = await _unitOfWork.GetRepo<Messages>().CreateAsync(_mapper.Map<Messages>(messageDTO));
            // await _unitOfWork.SaveChangesAsync();
            // return createdMessage;
            return await _messageRepository.CreateAsync(_mapper.Map<Messages>(messageDTO));
        }
    }
}
