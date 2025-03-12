using System.ComponentModel.DataAnnotations;
using BusinessObjects.Enums;
using Helpers.HelperClasses;

namespace Helpers.DTOs.Notification
{
    public class CreateNotificationDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Account ID")]
        public long AccountId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Notification type")]
        public NotificationType NotificationType { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Status")]
        public NotificationStatus Status { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        public string Content { get; set; } = string.Empty;
        [Required(ErrorMessage = "Time is required")]
        public DateTime Time { get; set; }
    }
}