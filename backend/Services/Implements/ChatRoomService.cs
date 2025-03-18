using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs.Chat;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class ChatRoomService : IChatRoomService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly IChatRoomRepository _chatRoomRepository;

        public ChatRoomService(
            //IUnitOfWork unitOfWork,
            IChatRoomRepository chatRoomRepository
            )
        {
            //_unitOfWork = unitOfWork;
            _chatRoomRepository = chatRoomRepository;
        }

        public async Task<ChatRoom> CreateDmChatRoomAsync(CreateChatRoomDTO createChatDTO)
        {
            var existedChatRoom = await GetDmChatRoomAsync(
                createChatDTO.ClientId,
                createChatDTO.FreelancerId
            );
            if (existedChatRoom != null)
            {
                return existedChatRoom;
            }

            //TODO: change this chatroom name
            var createdChatRoom = await CreateChatRoom(createChatDTO.ChatRoomName);

            //await _unitOfWork
            //    .GetRepo<RoomDetail>()
            //    .CreateAsync(
            //        new RoomDetail()
            //        {
            //            AccountId = createChatDTO.ClientId,
            //            ChatRoomId = createdChatRoom.ChatRoomID,
            //        }
            //    );
            await _chatRoomRepository.CreateRoomDetailAsync(
                    new RoomDetail()
                    {
                        AccountId = createChatDTO.ClientId,
                        ChatRoomId = createdChatRoom.ChatRoomID
                    }
                );
            
            //await _unitOfWork
            //    .GetRepo<RoomDetail>()
            //    .CreateAsync(
            //        new RoomDetail()
            //        {
            //            AccountId = createChatDTO.FreelancerId,
            //            ChatRoomId = createdChatRoom.ChatRoomID,
            //        }
            //    );
            await _chatRoomRepository.CreateRoomDetailAsync(
                    new RoomDetail()
                    {
                        AccountId = createChatDTO.FreelancerId,
                        ChatRoomId = createdChatRoom.ChatRoomID
                    }
                );

            //await _unitOfWork.SaveChangesAsync();
            //await AddAccountToChatRoom(chatRoom.ChatRoomID, createChatDTO.ClientId);
            //await AddAccountToChatRoom(chatRoom.ChatRoomID, createChatDTO.FreelancerId);

            return createdChatRoom;
        }

        private async Task<ChatRoom> CreateChatRoom(string chatRoomName)
        {
            var chatRoom = new ChatRoom() { ChatRoomName = chatRoomName };
            //chatRoom = await _unitOfWork.GetRepo<ChatRoom>().CreateAsync(chatRoom);
            //await _unitOfWork.SaveChangesAsync();
            chatRoom = await _chatRoomRepository.CreateChatRoomAsync(chatRoom);
            return chatRoom;
        }

        public async Task<IEnumerable<ChatRoom>> GetChatRoomsByUserIdAsync(long accountId)
        {
            //var queryRoomDetail = new QueryBuilder<RoomDetail>()
            //    .WithTracking(false)
            //    .WithPredicate(roomDetail => roomDetail.AccountId.Equals(accountId))
            //    .WithInclude(r => r.ChatRooms)
            //    .Build();

            //var roomDetail = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(queryRoomDetail);
            var roomDetail = await _chatRoomRepository.GetAllRoomDetailsAsync(accountId);

            var roomIdList = roomDetail.Select(rd => rd.ChatRooms.ChatRoomID);

            //var roomQuery = new QueryBuilder<ChatRoom>()
            //    .WithTracking(false)
            //    .WithPredicate(r => roomIdList.Contains(r.ChatRoomID))
            //    .Build();

            //var returnRoom = await _unitOfWork
            //    .GetRepo<ChatRoom>()
            //    .Get(roomQuery)
            //    .Include(cr => cr.RoomDetails)
            //    .ThenInclude(rd => rd.Account)
            //    .ToListAsync();
            var returnRoom = await _chatRoomRepository.GetAllChatRoomAsync(roomIdList);

            foreach (ChatRoom r in returnRoom)
            {
                var removeCurrentUserFromRoomDetail = r
                    .RoomDetails.AsQueryable()
                    .Where(rd => !rd.AccountId.Equals(accountId))
                    .ToList();
                r.RoomDetails = removeCurrentUserFromRoomDetail;
            }

            return returnRoom;
        }

        public async Task<ChatRoom?> GetDmChatRoomAsync(long clientId, long freelancerId)
        {
            // First, get RoomDetails for both users
            //var queryRoomDetail = new QueryBuilder<RoomDetail>()
            //    .WithTracking(false)
            //    .WithPredicate(rd =>
            //        rd.AccountId.Equals(clientId) || rd.AccountId.Equals(freelancerId)
            //    )
            //    .WithInclude(r => r.ChatRooms)
            //    .Build();

            //var roomDetails = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(queryRoomDetail);
            var roomDetails = await _chatRoomRepository.GetAllRoomDetailsAsync(clientId, freelancerId);

            // Group by ChatRoomID and find rooms that contain both users
            var roomIdsWithBothUsers = roomDetails
                .GroupBy(rd => rd.ChatRooms.ChatRoomID)
                .Where(g =>
                    g.Count() == 2
                    && // DM should have exactly 2 participants
                    g.Any(rd => rd.AccountId == clientId)
                    && g.Any(rd => rd.AccountId == freelancerId)
                )
                .Select(g => g.Key);

            if (!roomIdsWithBothUsers.Any())
            {
                return null;
            }

            // Get the chat room details
            //var roomQuery = new QueryBuilder<ChatRoom>()
            //    .WithTracking(false)
            //    .WithPredicate(r => roomIdsWithBothUsers.Contains(r.ChatRoomID))
            //    .Build();

            //var chatRoom = await _unitOfWork
            //    .GetRepo<ChatRoom>()
            //    .Get(roomQuery)
            //    .Include(cr => cr.RoomDetails)
            //    .ThenInclude(rd => rd.Account)
            //    .FirstOrDefaultAsync();
            var chatRoom = await _chatRoomRepository.GetSingleByIdAsync(roomIdsWithBothUsers.First());

            if (chatRoom != null)
            {
                var removeCurrentUserFromRoomDetail = chatRoom
                    .RoomDetails.AsQueryable()
                    .Where(rd => !rd.AccountId.Equals(clientId)) // or freelancerId
                    .ToList();
                chatRoom.RoomDetails = removeCurrentUserFromRoomDetail;
            }

            return chatRoom;
        }

        public async Task<IEnumerable<ChatRoom>> GetRoomDetailsBySharedChatRoomsAsync(
            long accountId
        )
        {
            // Step 1: Get ChatRoom IDs where the accountId is a member
            //var userRoomQuery = new QueryBuilder<RoomDetail>()
            //    .WithTracking(false)
            //    .WithPredicate(roomDetail => roomDetail.AccountId == accountId)
            //    .Build();
            //var userRooms = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(userRoomQuery);
            var userRooms = await _chatRoomRepository.GetAllRoomDetailsAsync(accountId);

            var chatRoomIds = userRooms.Select(rd => rd.ChatRoomId).Distinct(); // Assuming ChatRoomId is a property

            // Step 2: Get all RoomDetail records for those ChatRoom IDs
            //var sharedRoomQuery = new QueryBuilder<RoomDetail>()
            //    .WithTracking(false)
            //    .WithInclude(r => r.ChatRooms) // Include ChatRooms if you need the full entity
            //    .WithPredicate(roomDetail =>
            //        chatRoomIds.Contains(roomDetail.ChatRoomId) && roomDetail.AccountId != accountId
            //    )
            //    .Build();
            //var result = await _unitOfWork.GetRepo<RoomDetail>().GetAllAsync(sharedRoomQuery);
            var result = await _chatRoomRepository.GetAllUserSharedRoomDetailsAsync(chatRoomIds, accountId);

            return result.Select(rd => rd.ChatRooms);
        }
    }
}
