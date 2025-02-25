using BusinessObjects.Models;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using Repositories.Queries;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implements
{
    public class ChatRoomService : IChatRoomService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ChatRoomService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task<ChatRoom> CreateDmChatRoomAsync(long clientId, long freelancerId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ChatRoom>> GetChatRoomsByUserIdAsync(long accountId)
        {
            var queryOption = new QueryBuilder<RoomDetail>()
                .WithTracking(false)
                .WithPredicate(roomDetail => roomDetail.AccountId.Equals(accountId))
                .WithInclude(r => r.ChatRooms)
                .Build();

            var result = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(queryOption);
            return result.Select(rd => rd.ChatRooms);
        }

        public async Task<ChatRoom?> GetDmChatRoomAsync(long clientId, long freelancerId)
        {
            var queryRoomDetail = new QueryBuilder<RoomDetail>()
                .WithTracking(false)
                .WithPredicate(rd => rd.AccountId.Equals(clientId) || rd.AccountId.Equals(freelancerId))
                .Build();
            var roomDetails = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(queryRoomDetail);

            var roomGrouping = roomDetails.GroupBy(r => r.ChatRoomId)
                .FirstOrDefault(
                g => g.Select(rd => rd.AccountId).Distinct().Count() == 2
                );
            if (roomGrouping == null)
            {
                return null;
            }

            var queryRoom = new QueryBuilder<ChatRoom>()
                .WithTracking(false)
                .WithPredicate(cr => cr.ChatRoomID.Equals(roomGrouping.Key))
                .Build();
            return await _unitOfWork.GetRepo<ChatRoom>().GetSingleAsync(queryRoom);
            //return roomGrouping?.Select(r => r.ChatRooms).ToArray()[0];
        }
    }
}
