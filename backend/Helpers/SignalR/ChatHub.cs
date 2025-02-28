using Helpers.DTOs.Chat;
using Microsoft.AspNetCore.SignalR;

namespace Helpers.SignalR
{
    public class ChatHub : Hub
    {
        public static readonly string ReceiveMessageMethod = "ReceiveMessage";
        public async Task JoinRoom(int roomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());

        }

        public async Task LeaveRoom(int roomId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId.ToString());
        }

        public async Task SendMessage(MessageDTO message)
        {
            System.Console.WriteLine(message.ChatRoomId.ToString());
            await Clients.Group(message.ChatRoomId.ToString()).SendAsync(ReceiveMessageMethod, message);
        }
    }
}
