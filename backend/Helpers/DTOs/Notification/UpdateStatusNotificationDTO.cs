using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Notification
{
    public class UpdateStatusNotificationDTO
    {
        [Required(ErrorMessage = "Notification ID is required")]
        public long NotificationId { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public NotificationStatus Status { get; set; }
    }
}