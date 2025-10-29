using Microsoft.AspNetCore.Identity;

namespace Invert.Api.Entities
{
    public class AppUser : IdentityUser
    {
        public string UserName { get; set; } = null!;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime? LastLoginAt { get; set; }

    }
}