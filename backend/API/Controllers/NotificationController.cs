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
        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationDTO notificationDto)
        {
            var result = await _notificationService.CreateNotificationAsync(notificationDto);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllNotification([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var result = await _notificationService.GetAllNotificationAsync(pageNumber, pageSize);
            if (result.IsFailure)
            {
                return BadRequest(result.Error);
            }
            return Ok(result.Value);
        }
    }
}