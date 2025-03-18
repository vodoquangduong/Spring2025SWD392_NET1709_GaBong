using AutoMapper;
using Helpers.DTOs.Chat;
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
        private readonly IMapper _mapper;


        public MessageController(IMessageService messageService, IMapper mapper)
        {
            this.messageService = messageService;
            _mapper = mapper;
        }

        /// <summary>
        /// Get all message of a room.
        /// </summary>
        /// <response code="200">Success.</response>
        /// <response code="404">Failed.</response>
        [HttpGet("messages/{chatRoomId}")]
        public async Task<IActionResult> GetChatRoomMessages([FromRoute] long chatRoomId)
        {
            var result = await messageService.GetChatRoomMessagesAsync(chatRoomId);
            return Ok(result.Select(_mapper.Map<MessageDTO>));
        }

        /// <summary>
        /// Send a message to room.
        /// </summary>
        /// <response code="200">Success.</response>
        /// <response code="404">Failed.</response>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MessageDTO messageDTO)
        {
            var result = await messageService.CreateMessagesAsync(messageDTO);
            return Ok(_mapper.Map<MessageDTO>(result));
        }
    }
}
