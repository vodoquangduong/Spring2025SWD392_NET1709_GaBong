using API;
using Helpers.SignalR;
using Serilog;
using Services.Implements;


var builder = WebApplication.CreateBuilder(args);

// read config from appsettings.json
var configuration = builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("adminconfig.json", optional: false, reloadOnChange: false)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables().Build();

// config Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

var mode = builder.Configuration["PaypalOptions:Mode"];
var clientId = builder.Configuration["PaypalOptions:ClientId"];
var clientSecret = builder.Configuration["PaypalOptions:ClientSecret"];

if (string.IsNullOrEmpty(mode) || string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
{
    throw new InvalidOperationException("PayPal configuration is missing required values.");
}
var url = builder.Configuration["Kestrel:Endpoints:Http:Url"];
if (!string.IsNullOrEmpty(url))
{
    builder.WebHost.UseUrls(url);
}

builder.Services.AddSingleton(x => new PayPalClient(mode, clientId, clientSecret));

var configService = new ConfigService(builder.Configuration);

configService.ConfigureServices(builder.Services);


var app = builder.Build();

// config Middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(builder =>
        builder.AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials()
               .WithOrigins("http://localhost:5173"));
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(builder =>
        builder.AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials()
               .WithOrigins("https://gigshub-gabong.vercel.app"));
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chatHub");
app.MapHub<NotifyUserHub>("/userHub");
app.MapControllers();

app.Run();
