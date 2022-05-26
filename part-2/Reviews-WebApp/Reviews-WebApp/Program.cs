using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Reviews_WebApp.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Reviews_WebAppContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Reviews_WebAppContext") ?? throw new InvalidOperationException("Connection string 'Reviews_WebAppContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Reviews}/{action=Index}/{id?}");

app.Run();
