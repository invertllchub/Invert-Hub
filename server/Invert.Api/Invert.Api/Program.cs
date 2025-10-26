using Invert.Api.Data;
using Invert.Api.Entities;
using Invert.Api.Mappings;
using Invert.Api.Repositories.Implementation;
using Invert.Api.Repositories.Interface;
using Invert.Api.Services.Implementation;
using Invert.Api.Services.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(option =>
option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
builder.Services.AddAutoMapper(cfg => { /* Optional config here */ }, typeof(AutoMapperProfile));


builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped(typeof(IGenaricRepository<>), typeof(GenaricRepository<>));
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IArticleService, ArticleService>();
builder.Services.AddScoped<IJobService , JobService>();

// Identity (ensure AppUser type and ApplicationDbContext are correct)
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();



builder.Services.AddCors(options =>
  options.AddPolicy("AllowReactDev", policy =>
    policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials()
  )
);

// Configure JWT auth
var jwtCfg = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtCfg["Key"] ?? throw new InvalidOperationException("Jwt:Key missing"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})

.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtCfg["Issuer"],
        ValidAudience = jwtCfg["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ClockSkew = TimeSpan.FromMinutes(1)
    };
});

builder.Services.AddControllers();

var app = builder.Build();

#region Database Migration and Seeding

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
    var logger = loggerFactory.CreateLogger<Program>();

    try
    {
        // Migrate the main database
        var context = services.GetRequiredService<ApplicationDbContext>();
        logger.LogInformation("Starting database migration");
        await context.Database.MigrateAsync();
        // await ApplicationDbContextSeed.SeedAsync(context);

        //// Seed initial users 
        //var DataSeed = services.GetRequiredService<ContextSeed>();
        //await DataSeed.InitializeAsync();
        ///
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        // await AppIdentityDbContextSeed.SeedUserAsync(userManager);

        logger.LogInformation("Database Migrated successfully");
    }
    catch (Exception ex)
    {
        var loggers = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during database migration");
    }
}

#endregion
// app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowReactDev");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
