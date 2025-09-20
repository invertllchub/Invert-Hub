using Invert.Api.Dtos;
using Invert.Api.Entities;
using Invert.Api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Invert.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]

    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<AppUser> _userManager;
        public AuthController(IAuthService authService, UserManager<AppUser> userManager)
        {
            _authService = authService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                //var user = await _userManager.FindByEmailAsync(LoginDto.Email);

                var user = await _authService.GetUserByNameAsync(loginDto.Email);

                if (user == null || !await _authService.CheckPasswordAsync(user, loginDto.Password))
                    return Unauthorized(new { Message = "Invalid username or password" });

                // Generate both access and refresh tokens
                //var tokens = await _authService.GenerateTokensAsync(user);

                return Ok(new UserDto
                {
                    DisplayName = user.UserName,
                    Email = user.Email,
                    Token = " tokens.accessToken",
                    //RefreshToken = tokens.refreshToken
                });
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (await _authService.UserExistsAsync(registerDto.UserName))
                    return BadRequest(new { Message = "Username is already taken" });

                if (await _authService.EmailExistsAsync(registerDto.Email))
                    return BadRequest(new { Message = "Email is already registered" });

                var user = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                    EmailConfirmed = true,
                };

                await _authService.CreateUserAsync(user, registerDto.Password);

                return Ok(new UserDto
                {
                    DisplayName = user.UserName,
                    Email = user.Email,
                    Token = " ",
                });
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

    }
}
