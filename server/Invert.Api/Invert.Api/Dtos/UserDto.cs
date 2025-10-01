namespace Invert.Api.Dtos
{
    public class UserDto
    {
        public required string DisplayName { get; set; }
        public required string Email { get; set; }
        public required string Token { get; set; }
        public string? RefreshToken { get; set; }
    }
}
