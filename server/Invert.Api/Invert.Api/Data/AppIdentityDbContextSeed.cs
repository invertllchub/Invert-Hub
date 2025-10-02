using Invert.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Invert.Api.Data

{
    public static class AppIdentityDbContextSeed
    {
        public class ContextSeed
        {
            private readonly ApplicationDbContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<IdentityRole> _roleManager;

            public ContextSeed(
                ApplicationDbContext context,
                UserManager<AppUser> userManager,
                RoleManager<IdentityRole> roleManager)
            {
                _context = context;
                _userManager = userManager;
                _roleManager = roleManager;
            }

            public async Task InitializeAsync()
            {
                // Apply migrations
                //await _context.Database.MigrateAsync();

                // Seed roles
                await SeedRolesAsync();

                // Seed users
                await SeedUsersAsync();

            }

            private async Task SeedRolesAsync()
            {
                if (!await _roleManager.RoleExistsAsync("Admin"))
                    await _roleManager.CreateAsync(new IdentityRole("Admin"));
                if (!await _roleManager.RoleExistsAsync("User"))
                    await _roleManager.CreateAsync(new IdentityRole("User"));
            }
        
            private async Task SeedUsersAsync()
            {
                try
                {
                    // Create admin user if doesn't exist
                    if (await _userManager.FindByNameAsync("admin") == null)
                    {
                        var adminUser = new AppUser
                        {
                            UserName = "admin",
                            Email = "admin@example.com",
                            EmailConfirmed = true,
                        };

                        var result = await _userManager.CreateAsync(adminUser, "Admin@123");
                        if (result.Succeeded)
                            await _userManager.AddToRoleAsync(adminUser, "Admin");
                    }





                    // Create 3  users +  records
                    for (int i = 1; i <= 3; i++)
                    {
                        string username = $"user{i}";
                        if (await _userManager.FindByNameAsync(username) == null)
                        {
                            var user = new AppUser
                            {
                                UserName = username,
                                Email = $"user{i}@example.com",
                                EmailConfirmed = true,

                            };

                            var result = await _userManager.CreateAsync(user, "User@123");
                            if (result.Succeeded)
                                await _userManager.AddToRoleAsync(user, "User");

                          
                        }
                    }

                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw ex ?? new Exception("An error occurred while seeding the database.");
                }
            }


        }




    }
}