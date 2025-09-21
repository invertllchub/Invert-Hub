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
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var user = await _authService.GetUserByEmailAsync(loginDto.Email);

                if (user == null) return BadRequest(new { Message = "User not found" });

                var result = await _authService.CheckPasswordAsync(user, loginDto.Password);

                if (!result) return BadRequest(new { Message = "Password is incorrect" });
                //generate token



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


        [HttpPost("register")]
        [AllowAnonymous]
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
