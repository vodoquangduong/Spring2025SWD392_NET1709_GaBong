using BusinessObjects.Enums;
using Helpers.HelperClasses;
using System.ComponentModel.DataAnnotations;

namespace Helpers.DTOs.Notification
{
    public class UpdateStatusNotificationDTO
    {
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Notification ID")]
        public long NotificationId { get; set; }
        [Required(ErrorMessage = ValidationMessage.RequiredField)]
        [Display(Name = "Status")]
        public NotificationStatus Status { get; set; }
    }
}