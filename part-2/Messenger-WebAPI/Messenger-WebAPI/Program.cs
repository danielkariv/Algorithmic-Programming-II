using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Messenger_WebAPI.Data;
using Messenger_WebAPI.Hubs;
using Microsoft.AspNetCore.SignalR;

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

builder.Services.AddRazorPages();
builder.Services.AddSignalR();


/*
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()               
                .AllowAnyMethod()
                .AllowCredentials();
        });
});
*/

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
              .SetIsOriginAllowed((o) => true)
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
        });
});

//builder.Services.AddSingleton<IDictionary<string, string>>(opts => new Dictionary<string, string>());
var app = builder.Build();

//app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

/*
app.UseCors(builder => builder

                            .AllowAnyMethod()
                            .AllowAnyHeader()                          
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());

*/
app.UseSession();

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.UseEndpoints(endpoints =>
 {
     endpoints.MapHub<Myhub>("/myHub");
    });

app.Run();
