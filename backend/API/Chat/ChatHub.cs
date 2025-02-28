using Helpers.DTOs.Chat;
using Microsoft.AspNetCore.SignalR;

namespace API.Chat
{
    public class ChatHub : Hub
    {
        public static readonly string ReceiveMessageMethod = "ReceiveMessage";
        public async Task JoinRoom(int roomId)
        {
            Console.WriteLine($"=======Join to room:=====================================================");
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());
            Console.WriteLine($"=======Join to room ok:=====================================================");

        }

        public async Task LeaveRoom(int roomId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId.ToString());
        }

        public async Task SendMessage(MessageDTO message)
        {
            Console.WriteLine($"=======Sending message to room:=====================================================");
            System.Console.WriteLine(message.ChatRoomId.ToString());
            await Clients.Group(message.ChatRoomId.ToString()).SendAsync(ReceiveMessageMethod, message);
        }
    }
}
