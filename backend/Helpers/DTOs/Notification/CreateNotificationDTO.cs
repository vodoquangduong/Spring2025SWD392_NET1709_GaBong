using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Notification
{
    public class CreateNotificationDTO
    {
        [Required(ErrorMessage = "Account ID is required")]
        public long AccountId { get; set; }
        [Required(ErrorMessage = "Notification type is required")]
        public NotificationType NotificationType { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public NotificationStatus Status { get; set; }
        [Required(ErrorMessage = "Content is required")]
        public string Content { get; set; } = string.Empty;
        [Required(ErrorMessage = "Time is required")]
        public DateTime Time { get; set; }
    }
}