using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers.DTOs.Notification;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        /// <summary>
        /// Send a notification to a specific user.
        /// </summary>
        /// <response code="200">Returns the list of chat rooms.</response>
        /// <response code="404">If no chat rooms are found for the user.</response>
        [HttpPost]
        public async Task<IActionResult> CreateNotification(
            [FromBody] CreateNotificationDTO notificationDto
        )
        {
            var result = await _notificationService.CreateNotificationAsync(notificationDto);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }

        /// <summary>
        /// Retrieves all notification of a specific user.
        /// </summary>
        /// <response code="200">Returns the list of chat rooms.</response>
        /// <response code="404">If no chat rooms are found for the user.</response>
        [HttpGet]
        public async Task<IActionResult> GetAllNotification(
            [FromQuery] int pageNumber,
            [FromQuery] int pageSize
        )
        {
            var result = await _notificationService.GetAllNotificationAsync(pageNumber, pageSize);
            if (result.IsFailure)
            {
                return Ok(result.Error);
            }
            return Ok(result.Value);
        }
    }
}
