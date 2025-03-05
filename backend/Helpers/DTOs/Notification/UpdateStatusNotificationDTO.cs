using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Notification
{
    public class UpdateStatusNotificationDTO
    {
        public long NotificationId { get; set; }
        public NotificationStatus Status { get; set; }
    }
}