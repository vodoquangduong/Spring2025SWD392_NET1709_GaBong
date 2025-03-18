using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class ChatRoomRepository : IChatRoomRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public ChatRoomRepository(
            IUnitOfWork unitOfWork
            )
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ChatRoom> CreateChatRoomAsync(ChatRoom chatRoom)
        {
            chatRoom = await _unitOfWork.GetRepo<ChatRoom>().CreateAsync(chatRoom);
            await _unitOfWork.SaveChangesAsync();
            return chatRoom;
        }

        public async Task<ChatRoom?> GetSingleByIdAsync(long chatRoomId)
        {
            // Get the chat room details
            var roomQuery = new QueryBuilder<ChatRoom>()
                .WithTracking(false)
                .WithPredicate(r => r.ChatRoomID == chatRoomId)
                .Build();

            var chatRoom = await _unitOfWork
                .GetRepo<ChatRoom>()
                .Get(roomQuery)
                .Include(cr => cr.RoomDetails)
                .ThenInclude(rd => rd.Account)
                .FirstOrDefaultAsync();
            return chatRoom;
        }

        public async Task<RoomDetail> CreateRoomDetailAsync(RoomDetail roomDetail)
        {
            var roomdetail = await _unitOfWork
                .GetRepo<RoomDetail>()
                .CreateAsync(roomDetail);
            await _unitOfWork.SaveChangesAsync();
            return roomdetail;
        }

        public async Task<IEnumerable<RoomDetail>> GetAllRoomDetailsAsync(long clientId, long freelancerId)
        {
            var queryRoomDetail = new QueryBuilder<RoomDetail>()
                .WithTracking(false)
                .WithPredicate(rd =>
                    rd.AccountId.Equals(clientId) || rd.AccountId.Equals(freelancerId)
                )
                .WithInclude(r => r.ChatRooms)
                .Build();

            var roomDetails = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(queryRoomDetail);
            return roomDetails;
        }

        public async Task<IEnumerable<RoomDetail>> GetAllRoomDetailsAsync(long accountId)
        {
            var queryRoomDetail = new QueryBuilder<RoomDetail>()
                .WithTracking(false)
                .WithPredicate(roomDetail => roomDetail.AccountId.Equals(accountId))
                .WithInclude(r => r.ChatRooms)
                .Build();

            var roomDetail = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(queryRoomDetail);

            return roomDetail;
        }

        public async Task<IEnumerable<ChatRoom>> GetAllChatRoomAsync(IEnumerable<long> roomIdList)
        {
            var roomQuery = new QueryBuilder<ChatRoom>()
                .WithTracking(false)
                .WithPredicate(r => roomIdList.Contains(r.ChatRoomID))
                .Build();

            var returnRoom = await _unitOfWork
                .GetRepo<ChatRoom>()
                .Get(roomQuery)
                .Include(cr => cr.RoomDetails)
                .ThenInclude(rd => rd.Account)
                .ToListAsync();

            return returnRoom;
        }


        public async Task<IEnumerable<RoomDetail>> GetAllUserSharedRoomDetailsAsync(IEnumerable<long> chatRoomIds, long accountId)
        {
            var sharedRoomQuery = new QueryBuilder<RoomDetail>()
                .WithTracking(false)
                .WithInclude(r => r.ChatRooms) // Include ChatRooms if you need the full entity
                .WithPredicate(roomDetail =>
                    chatRoomIds.Contains(roomDetail.ChatRoomId) && roomDetail.AccountId != accountId
                )
                .Build();
            var result = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(sharedRoomQuery);

            return result;
        }
    }
}
