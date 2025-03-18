using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface IChatRoomRepository
    {
        Task<ChatRoom?> GetSingleByIdAsync(long chatRoomId);
        Task<ChatRoom> CreateChatRoomAsync(ChatRoom chatRoom);
        Task<RoomDetail> CreateRoomDetailAsync(RoomDetail roomDetail);
        Task<IEnumerable<RoomDetail>> GetAllRoomDetailsAsync(long clientId, long freelancerId);
        Task<IEnumerable<RoomDetail>> GetAllRoomDetailsAsync(long accountId);
        Task<IEnumerable<RoomDetail>> GetAllUserSharedRoomDetailsAsync(IEnumerable<long> chatRoomIds, long accountId);
        Task<IEnumerable<ChatRoom>> GetAllChatRoomAsync(IEnumerable<long> roomIdList);
    }
}
