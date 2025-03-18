using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class MessageRepository : IMessageRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public MessageRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Messages>> GetAllByChatRoomIdAsync(long chatRoomId)
        {
            var queryRoomMessage = new QueryBuilder<Messages>()
                .WithTracking(false)
                .WithPredicate(m => m.ChatRoomId.Equals(chatRoomId))
                .Build();
            return await _unitOfWork.GetRepo<Messages>().GetAllAsync(queryRoomMessage);
        }

        public async Task<Messages> CreateAsync(Messages message)
        {
            var createdMessage = await _unitOfWork.GetRepo<Messages>().CreateAsync(message);
            await _unitOfWork.SaveChangesAsync();
            return createdMessage;
        }
    }
}
