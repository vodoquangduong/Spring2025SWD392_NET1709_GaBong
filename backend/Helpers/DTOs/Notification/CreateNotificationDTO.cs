using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Notification
{
    public class CreateNotificationDTO
    {
        public long NotificationId { get; set; }
        public long AccountId { get; set; }
        public NotificationType NotificationType { get; set; }
        public NotificationStatus Status { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime Time { get; set; }
    }
}