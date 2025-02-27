using Helpers.DTOs.Chat;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatRoomController : ControllerBase
    {
        private readonly IChatRoomService _chatRoomService;

        public ChatRoomController(IChatRoomService chatRoomService)
        {
            _chatRoomService = chatRoomService;
        }

        //// GET: api/<ChatRoomController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<ChatRoomController>/5
        /// <summary>
        /// Retrieves all chat rooms associated with a specific user.
        /// </summary>
        /// <param name="userId">The ID of the user whose chat rooms are to be retrieved.</param>
        /// <returns>A list of chat rooms for the specified user.</returns>
        /// <response code="200">Returns the list of chat rooms.</response>
        /// <response code="404">If no chat rooms are found for the user.</response>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetChatRoomByUserId([FromRoute] long userId)
        {
            var chatRooms = await _chatRoomService.GetChatRoomsByUserIdAsync(userId);
            return Ok(chatRooms);
        }

        /// <summary>
        /// Get chat room between client and freelancer.
        /// </summary>
        /// <param name="clientId">The accountId of the client</param>
        /// <param name="freelancerId">The accountId of the freelancer</param>
        /// <response code="200">Returns the list of chat rooms.</response>
        /// <response code="404">If no chat rooms are found for the user.</response>
        [HttpGet("{clientId}/{freelancerId}")]
        public async Task<IActionResult> GetDmChatRoom([FromRoute] long clientId, [FromRoute] long freelancerId)
        {
            var chatRoom = await _chatRoomService.GetDmChatRoomAsync(clientId, freelancerId);
            return Ok(chatRoom);
        }

        /// <summary>
        /// Create a chat room between client and freelancer.
        /// </summary>
        /// <returns>Return status for creating chat room.</returns>
        /// <response code="200">Create success.</response>
        /// <response code="404">Create failed.</response>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateChatRoomDTO createChatDTO)
        {
            var chatRoom = await _chatRoomService.CreateDmChatRoomAsync(createChatDTO);
            return Ok(chatRoom);
        }

        //// PUT api/<ChatRoomController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ChatRoomController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
