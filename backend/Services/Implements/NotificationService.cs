using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs;
using Helpers.DTOs.Notification;
using Helpers.HelperClasses;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class NotificationService : INotificationService
    {
        private readonly IUnitOfWork _unitOfWork;   
        private readonly IMapper _mapper;
        public NotificationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Result<NotificationDTO>> CreateNotificationAsync(CreateNotificationDTO notificationDto)
        {
            try
            {
                var user = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>
                {
                    Predicate  = a => a.AccountId == notificationDto.AccountId
                });
                if(user == null)
                {
                    return Result.Failure<NotificationDTO>(new Error("User not found", $"User with id {notificationDto.AccountId}"));
                }
                var notification = _mapper.Map<Notification>(notificationDto);
                var result = await _unitOfWork.GetRepo<Notification>().CreateAsync(notification);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(_mapper.Map<NotificationDTO>(result));
            }
            catch (Exception e)
            {
                return Result.Failure<NotificationDTO>(new Error("Create notification failed", e.Message));
            }
        }

        public async Task<Result<PaginatedResult<NotificationDTO>>> GetAllNotificationAsync(int pageNumber, int pageSize)
        {
            try
            {
                var queryOptions = new QueryOptions<Notification>
                {
                    OrderBy = n => n.OrderByDescending(n => n.Time)
                };
                var query =  _unitOfWork.GetRepo<Notification>().Get(queryOptions);
                var paginatedNotifications = await Pagination.ApplyPaginationAsync(query, pageNumber, pageSize, _mapper.Map<NotificationDTO>);
                return Result.Success(paginatedNotifications);
            }
            catch (Exception e)
            {
                return Result.Failure<PaginatedResult<NotificationDTO>>(new Error("Get all notification failed", e.Message));
            }
        }

        public async Task<Result<NotificationDTO>> UpdateStatusNotificationAsync(UpdateStatusNotificationDTO updateDTO)
        {
            try
            {
                var notification = await _unitOfWork.GetRepo<Notification>().GetSingleAsync(new QueryOptions<Notification>
                {
                    Predicate = n => n.NotificationId == updateDTO.NotificationId
                });
                if(notification == null)
                {
                    return Result.Failure<NotificationDTO>(new Error("Notification not found", $"Notification with id {updateDTO.NotificationId}"));
                }
                _mapper.Map(updateDTO, notification);
                await _unitOfWork.SaveChangesAsync();
                return Result.Success(_mapper.Map<NotificationDTO>(notification));
            }
            catch (Exception e)
            {
                return Result.Failure<NotificationDTO>(new Error("Update status notification failed", e.Message));
            }
        }
    }
}