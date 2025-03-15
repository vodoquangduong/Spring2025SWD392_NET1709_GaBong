using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ASeedController : ControllerBase
    {
        private readonly ISeedService _seedService;

        public ASeedController(ISeedService seedService)
        {
            _seedService = seedService;
        }

        [HttpPost]
        public async Task<IActionResult> SeedForDatabase()
        {
            await _seedService.CreateSeedAsync();
            return Ok("Database seeding completed!");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteDatabase()
        {
            await _seedService.ResetDatabaseAsync();
            return Ok("Database reset successfully!");
        }
    }
}
