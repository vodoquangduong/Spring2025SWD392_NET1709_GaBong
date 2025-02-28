using Helpers.DTOs.Chat;
using Helpers.DTOs.Notification;
using Microsoft.AspNetCore.SignalR;

namespace Helpers.SignalR
{
    public class NotifyUserHub : Hub
    {
        public static readonly string ReceiveNotification = "ReceiveNotification";
        public async Task UserConnect(int userId)
        {
            //Console.WriteLine($"Connected userId: {userId}");
            await Groups.AddToGroupAsync(Context.ConnectionId, userId.ToString());
        }

        public async Task NotifyUser(CreateNotificationDTO notificationDTO)
        {
            //Console.WriteLine($"Notify userId: {receiverId}, Content: {notification}");
            //await Clients.User(receiverId.ToString()).SendAsync( ReceiveNotification, messageDTO);
            await Clients.Group(notificationDTO.AccountId.ToString()).SendAsync(ReceiveNotification, notificationDTO);
        }
    }
}
