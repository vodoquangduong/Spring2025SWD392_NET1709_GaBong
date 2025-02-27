using BusinessObjects.Models;
using Helpers.DTOs.Chat;
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

        public async Task<ChatRoom> CreateDmChatRoomAsync(CreateChatRoomDTO createChatDTO)
        {
            var existedChatRoom = await GetDmChatRoomAsync(createChatDTO.ClientId, createChatDTO.FreelancerId);
            if(existedChatRoom != null)
            {
                return existedChatRoom;
            }

            //TODO: change this chatroom name
            System.Console.WriteLine("Hello create chat room");
            var createdChatRoom = await CreateChatRoom(createChatDTO.ChatRoomName);

            await _unitOfWork.GetRepo<RoomDetail>().CreateAsync(new RoomDetail() { AccountId = createChatDTO.ClientId, 
                ChatRoomId = createdChatRoom.ChatRoomID
            });
            await _unitOfWork.GetRepo<RoomDetail>().CreateAsync(new RoomDetail() { AccountId = createChatDTO.FreelancerId, 
                ChatRoomId = createdChatRoom.ChatRoomID
            });

            await _unitOfWork.SaveChangesAsync();
            //await AddAccountToChatRoom(chatRoom.ChatRoomID, createChatDTO.ClientId);
            //await AddAccountToChatRoom(chatRoom.ChatRoomID, createChatDTO.FreelancerId);

            return createdChatRoom;
        }

        private async Task<ChatRoom> CreateChatRoom(string chatRoomName)
        {
            var chatRoom = new ChatRoom() { ChatRoomName = chatRoomName };
            chatRoom = await _unitOfWork.GetRepo<ChatRoom>().CreateAsync(chatRoom);
            await _unitOfWork.SaveChangesAsync();
            return chatRoom;
        }

        public async Task<IEnumerable<ChatRoom>> GetChatRoomsByUserIdAsync(long accountId)
        {
            var queryOption = new QueryBuilder<RoomDetail>()
                .WithTracking(false)
                .WithPredicate(roomDetail => roomDetail.AccountId.Equals(accountId))
                .WithInclude(r => r.ChatRooms)
                .Build();

            //var result = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(queryOption);
            //return result.Select(rd => rd.ChatRooms);
            var roomDetail = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(queryOption);

            var roomId = roomDetail.Select(rd => rd.ChatRooms.ChatRoomID);

            var roomQuery = new QueryBuilder<ChatRoom>()
                .WithTracking(false)
                .WithPredicate(r => roomId.Contains(r.ChatRoomID))
                .WithInclude(r => r.RoomDetails)
                .Build();
            var room =  await _unitOfWork.GetRepo<ChatRoom>().GetAllAsync(roomQuery);
            //room.Where(r => roomId.Contains(r.ChatRoomID));
            //room.Where(r => !r.RoomDetails.Any(rd => rd.AccountId.Equals(accountId)));
            foreach(ChatRoom r in room)
            {
                var temp = r.RoomDetails.AsQueryable().Where(rd => !rd.AccountId.Equals(accountId)).ToList();
                r.RoomDetails = temp;
            }

            return room;
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
