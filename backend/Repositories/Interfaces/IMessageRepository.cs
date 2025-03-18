using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface IMessageRepository
    {

        Task<IEnumerable<Messages>> GetAllByChatRoomIdAsync(long chatRoomId);
        Task<Messages> CreateAsync(Messages message);
    }
}
