using BusinessObjects.Models;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public NotificationRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Notification> CreateAsync(Notification notification)
        {
            var result = await _unitOfWork.GetRepo<Notification>().CreateAsync(notification);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public IQueryable<Notification> GetAllOrderByTimePaging()
        {
            var queryOptions = new QueryOptions<Notification>
            {
                OrderBy = n => n.OrderByDescending(n => n.Time)
            };
            var query = _unitOfWork.GetRepo<Notification>().Get(queryOptions);
            return query;
        }

        public async Task<Notification?> GetSingleByIdAsync(long notificationId)
        {
            var notification = await _unitOfWork.GetRepo<Notification>().GetSingleAsync(new QueryOptions<Notification>
            {
                Predicate = n => n.NotificationId == notificationId
            });

            return notification;
        }
    }
}
