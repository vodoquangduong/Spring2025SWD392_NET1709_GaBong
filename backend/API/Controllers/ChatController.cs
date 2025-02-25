using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatRoomService _chatRoomService;

        public ChatController(IChatRoomService chatRoomService)
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
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetChatRoomByUserId([FromRoute] long userId)
        {
            var chatRooms = await _chatRoomService.GetChatRoomsByUserIdAsync(userId);

            return Ok(chatRooms);
        }

        [HttpGet("{clientId}, {freelancerId}")]
        public async Task<IActionResult> GetDmChatRoom([FromRoute] long clientId, [FromRoute] long freelancerId)
        {
            var chatRoom = await _chatRoomService.GetDmChatRoomAsync(clientId, freelancerId);
            return Ok(chatRoom);
        }

        //// POST api/<ChatRoomController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

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
