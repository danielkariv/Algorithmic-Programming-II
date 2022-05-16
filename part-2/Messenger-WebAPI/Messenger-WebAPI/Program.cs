using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Messenger_WebAPI.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Messenger_WebAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Messenger_WebAPIContext") ?? throw new InvalidOperationException("Connection string 'Messenger_WebAPIContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(45); // 45 mins to timeout.
    options.Cookie.HttpOnly = false;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});
builder.Services.AddDistributedMemoryCache();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder

                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());

app.UseSession();
app.UseAuthorization();

app.MapControllers();



app.Run();
