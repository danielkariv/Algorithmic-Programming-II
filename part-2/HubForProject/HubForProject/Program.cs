using HubForProject.Hubs;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Allow All",
        builder =>
        {
            builder.SetIsOriginAllowed((o)=>true)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

/*
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
*/
builder.Services.AddSingleton<IDictionary<string, string>>(opts => new Dictionary<string, string>());
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("Allow All");
app.UseHttpsRedirection();
app.UseStaticFiles();
//app.UseSession();
app.UseRouting();

app.UseAuthorization();



app.MapRazorPages();
app.MapControllers();
app.MapHub<MyHub>("/myHub");

/*
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<MyHub>("/myHub");
});
*/


app.Run();
