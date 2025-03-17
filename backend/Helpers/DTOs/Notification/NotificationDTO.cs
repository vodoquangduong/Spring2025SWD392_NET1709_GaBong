using BusinessObjects.Enums;

namespace Helpers.DTOs
{
    public class NotificationDTO
    {
        public long NotificationId { get; set; }
        public long AccountId { get; set; }
        public NotificationType NotificationType { get; set; }
        public DateTime Time { get; set; }
        public NotificationStatus Status { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}