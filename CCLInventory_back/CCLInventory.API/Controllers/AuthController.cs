using Microsoft.AspNetCore.Mvc;
using CCLInventory.API.Models;
using CCLInventory.API.Services;

namespace CCLInventory.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;

        // Credenciales fijas en memoria
        private const string ValidUsername = "admin";
        private const string ValidPassword = "admin123";

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request.Username == ValidUsername && request.Password == ValidPassword)
            {
                var token = _jwtService.GenerateToken(request.Username);
                return Ok(new { token });
            }

            return Unauthorized(new { message = "Credenciales inválidas" });
        }
    }
}