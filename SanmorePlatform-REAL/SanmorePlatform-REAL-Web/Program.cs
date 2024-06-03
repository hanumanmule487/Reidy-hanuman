using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddHttpClient();
builder.Services.AddSession();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
{
    option.ExpireTimeSpan = TimeSpan.FromDays(1);
    option.LoginPath = "/Account/Unauthorized";
    //option.AccessDeniedPath = "/Account/Unauthorize";
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy =>
        policy.RequireRole("TransactionCoordinator"));
    options.AddPolicy("RequireBrokerRole", policy =>
    policy.RequireRole("Broker"));
});

// Session Time
//builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
//{
//    option.ExpireTimeSpan = TimeSpan.FromDays(1);
//    option.LoginPath = "/Home/Index";
//    option.AccessDeniedPath = "/Home/Index";
//});
builder.Services.AddSession(Options =>
{
    Options.IdleTimeout = TimeSpan.FromDays(1);
    Options.Cookie.HttpOnly = true;
    Options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.Use(async (context, next) =>
{
    context.Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    context.Response.Headers["Pragma"] = "no-cache";
    context.Response.Headers["Expires"] = "0";
    await next();
});



app.UseExceptionHandler("/Home/Error");
app.UseHsts();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();
app.MapControllerRoute(
    name: "default",
 //pattern: "{controller=Home}/{action=Index}/{id?}");
   pattern: "{controller=Landing}/{action=Landing}/{id?}");


app.Run();
