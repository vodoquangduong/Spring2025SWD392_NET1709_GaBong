using BusinessObjects.Models;

namespace Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task<Notification> CreateAsync(Notification notification);
        Task<Notification?> GetSingleByIdAsync(long notificationId);
        IQueryable<Notification> GetAllOrderByTimePaging();
    }
}
