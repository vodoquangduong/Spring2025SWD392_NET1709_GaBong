using AutoMapper;
using DAOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repositories.Implements;
using Repositories.Interfaces;
using Services.Implements;
using Services.Interfaces;
using System.Reflection;
using System.Text;

namespace API
{
    public class ConfigService
    {
        private readonly IConfiguration _configuration;

        public ConfigService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // add service to DI container
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(option =>
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

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = _configuration["JWT:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = _configuration["JWT:Audience"],
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SigningKey"] ?? "Error when getting JWT SigningKey"))
                    };
                });

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));

#pragma warning disable CS0618 // Type or member is obsolete
            services.AddAutoMapper(cfg =>
            {
                cfg.ShouldMapMethod = m => false;
                cfg.AddProfile<Helpers.Mappers.MapperProfile>();
            });
#pragma warning restore CS0618 // Type or member is obsolete

            services.AddHttpContextAccessor();

            //services.AddSingleton(x => new PayPalClient(mode, clientId, clientSecret));

            // Repository
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IBidRepository, BidRepository>();
            services.AddScoped<IChatRoomRepository, ChatRoomRepository>();
            services.AddScoped<IContractRepository, ContractRepository>();
            services.AddScoped<IFeedbackRepository, FeedbackRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IMilestoneRepository, MilestoneRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();
            services.AddScoped<IPortfolioRepository, PortfolioRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<ISkillCategoryRepository, SkillCateogryRepository>();
            services.AddScoped<ISkillPerformRepository, SkillPerformRepository>();
            services.AddScoped<ISkillRequiredRepository, SkillRequiredRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));



            // Service
            services.AddSingleton<IAdminConfigService, AdminConfigService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IBidService, BidService>();
            services.AddScoped<ISkillCategoryService, SkillCategoryService>();
            services.AddScoped<IContractService, ContractService>();
            services.AddScoped<IPortfolioService, PortfolioService>();
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IMilestoneService, MilestoneService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IChatRoomService, ChatRoomService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<ISkillRequiredService, SkillRequiredService>();
            services.AddScoped<ISeedService, SeedService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IFeedbackService, FeedbackService>();
            services.AddScoped<IMailSenderService, MailSenderService>();
            services.AddSignalR();

        }
    }
}
