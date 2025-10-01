using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Invert.Api.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [JsonPropertyName("Email")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [JsonPropertyName("password")]
        public required string Password { get; set; }
    }
}
