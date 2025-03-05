
using Helpers.DTOs;
using Helpers.DTOs.Notification;
using Helpers.HelperClasses;

namespace Services.Interfaces
{
    public interface INotificationService
    {
     public Task<Result<NotificationDTO>> CreateNotificationAsync(CreateNotificationDTO notificationDto);
     public Task<Result<PaginatedResult<NotificationDTO>>> GetAllNotificationAsync(int pageNumber, int pageSize);   
     public Task<Result<NotificationDTO>> UpdateStatusNotificationAsync(UpdateStatusNotificationDTO updateDTO);
    }
}