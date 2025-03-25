using AutoMapper;
using DAOs;
using Helpers.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repositories.Implements;
using Repositories.Interfaces;
using Serilog;
using Services.Implements;
using Services.Interfaces;
using System.Reflection;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// read config from appsettings.json
var configuration = builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables().Build();
// config Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .CreateLogger();

builder.Host.UseSerilog();

// add service to DI container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] { }
        }
    });
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    option.IncludeXmlComments(xmlPath);
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = configuration["JWT:Issuer"],
            ValidateAudience = true,
            ValidAudience = configuration["JWT:Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:SigningKey"] ?? "Error when getting JWT SigningKey"))
        };
    });

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

#pragma warning disable CS0618 // Type or member is obsolete
builder.Services.AddAutoMapper(cfg =>
{
    cfg.ShouldMapMethod = m => false;
    cfg.AddProfile<Helpers.Mappers.MapperProfile>();
});
#pragma warning restore CS0618 // Type or member is obsolete

builder.Services.AddHttpContextAccessor();

var mode = builder.Configuration["PaypalOptions:Mode"];
var clientId = builder.Configuration["PaypalOptions:ClientId"];
var clientSecret = builder.Configuration["PaypalOptions:ClientSecret"];

if (string.IsNullOrEmpty(mode) || string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
{
    throw new InvalidOperationException("PayPal configuration is missing required values.");
}

builder.Services.AddSingleton(x => new PayPalClient(mode, clientId, clientSecret));

// Repository
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IBidRepository, BidRepository>();
builder.Services.AddScoped<IChatRoomRepository, ChatRoomRepository>();
builder.Services.AddScoped<IContractRepository, ContractRepository>();
builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IMilestoneRepository, MilestoneRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IPortfolioRepository, PortfolioRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IReportRepository, ReportRepository>();
builder.Services.AddScoped<ISkillCategoryRepository, SkillCateogryRepository>();
builder.Services.AddScoped<ISkillPerformRepository, SkillPerformRepository>();
builder.Services.AddScoped<ISkillRequiredRepository, SkillRequiredRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));



// Service
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IBidService, BidService>();
builder.Services.AddScoped<ISkillCategoryService, SkillCategoryService>();
builder.Services.AddScoped<IContractService, ContractService>();
builder.Services.AddScoped<IPortfolioService, PortfolioService>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<IMilestoneService, MilestoneService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IChatRoomService, ChatRoomService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<ISkillRequiredService, SkillRequiredService>();
builder.Services.AddScoped<ISeedService, SeedService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<IMailSenderService, MailSenderService>();
builder.Services.AddSignalR();

var url = builder.Configuration["Kestrel:Endpoints:Http:Url"];
builder.WebHost.UseUrls(url);

var app = builder.Build();

// config Middleware
// if (app.Environment.IsDevelopment())
// {
app.UseDeveloperExceptionPage();
app.UseSwagger();
app.UseSwaggerUI();
// }

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(builder =>
    builder.AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials()
           .WithOrigins("http://localhost:5173"));
app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chatHub");
app.MapHub<NotifyUserHub>("/userHub");
app.MapControllers();

app.Run();
