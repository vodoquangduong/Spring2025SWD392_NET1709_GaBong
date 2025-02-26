using Helpers.DTOs.Chat;
using Helpers.Mappers;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService messageService;

        public MessageController(IMessageService messageService)
        {
            this.messageService = messageService;
        }

        [HttpGet("messages/{chatRoomId}")]
        public async Task<IActionResult> GetChatRoomMessages([FromRoute] long chatRoomId)
        {
            var result = await messageService.GetChatRoomMessagesAsync(chatRoomId);
            return Ok(result.Select(r => r.ToMessageDTO()));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MessageDTO messageDTO)
        {
            var result = await messageService.CreateMessagesAsync(messageDTO);
            return Ok(result.ToMessageDTO());
        }
    }
}
