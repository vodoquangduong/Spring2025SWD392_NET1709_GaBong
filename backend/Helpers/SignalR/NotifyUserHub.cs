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
            try
            {
                Console.WriteLine(
                    $"================================================UserConnect called with userId: {userId}, ConnectionId: {Context.ConnectionId}"
                );
                await Groups.AddToGroupAsync(Context.ConnectionId, userId.ToString());
                Console.WriteLine($"User {userId} added to group successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UserConnect: {ex.Message}");
                throw; // Re-throw to let the client see the error
            }
        }

        public async Task NotifyUser(CreateNotificationDTO notificationDTO)
        {
            Console.WriteLine(
                $"Notify userId: {notificationDTO.AccountId}, Content: {notificationDTO.Content}"
            );
            //await Clients.User(receiverId.ToString()).SendAsync( ReceiveNotification, messageDTO);
            await Clients
                .Group(notificationDTO.AccountId.ToString())
                .SendAsync(ReceiveNotification, notificationDTO);
        }
    }
}
