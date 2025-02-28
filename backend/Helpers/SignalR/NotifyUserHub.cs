using Helpers.DTOs.Chat;
using Microsoft.AspNetCore.SignalR;

namespace Helpers.SignalR
{
    public class NotifyUserHub : Hub
    {
        public static readonly string ReceiveNotification = "ReceiveNotification";
        public async Task UserConnect(int userId)
        {
            Console.WriteLine($"Connected userId: {userId}");
            await Groups.AddToGroupAsync(Context.ConnectionId, userId.ToString());
        }

        public async Task NotifyUser(int receiverId, string notification)
        {
            var messageDTO = new MessageDTO(){ MessageContent = notification };
            Console.WriteLine($"Notify userId: {receiverId}, Content: {notification}");
            //await Clients.User(receiverId.ToString()).SendAsync( ReceiveNotification, messageDTO);
            await Clients.Group(receiverId.ToString()).SendAsync(ReceiveNotification, messageDTO);
        }
    }
}
