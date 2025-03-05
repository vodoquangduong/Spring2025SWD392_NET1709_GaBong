using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs;
using Helpers.DTOs.Notification;

namespace Helpers.Mappers
{
    public static class NotificationMapper
    {
        public static NotificationDTO ToNotificationDTO(this Notification notification)
        {
            return new NotificationDTO
            {
                AccountId = notification.AccountId,
                NotificationId = notification.NotificationId,
                Content = notification.Content,
                NotificationType = notification.Type,
                Status = notification.Status,
                Time = notification.Time,
            };
        }

        public static Notification ToNotification(this CreateNotificationDTO notificationDTO)
        {
            return new Notification
            {
                AccountId = notificationDTO.AccountId,
                Content = notificationDTO.Content,
                Type = notificationDTO.NotificationType,
                Status = notificationDTO.Status,
                Time = DateTime.UtcNow,
            };
        }

        public static void ToNotification(this Notification notification, UpdateStatusNotificationDTO updateDTO)
        {
            notification.Status = updateDTO.Status;

        }
    }
}
