using DAOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repositories.Implements;
using Repositories.Interfaces;
using Services.Implements;
using Services.Interfaces;
using AutoMapper;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
                //var xmlFileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                //var path = Path.Combine(AppContext.BaseDirectory, xmlFileName);
                //option.IncludeXmlComments(path);
                option.AddSecurityDefinition(
                    "Bearer",
                    new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Please enter a valid token",
                        Name = "Authorization",
                        Type = SecuritySchemeType.Http,
                        BearerFormat = "JWT",
                        Scheme = "Bearer"
                    }
                );
                option.AddSecurityRequirement(
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] { }
                        }
                    }
                );
            });

            builder
               .Services.AddAuthentication(options =>
               {
                   options.DefaultAuthenticateScheme =
                       options.DefaultChallengeScheme =
                       options.DefaultForbidScheme =
                       options.DefaultScheme =
                       options.DefaultSignInScheme =
                       options.DefaultSignOutScheme =
                           JwtBearerDefaults.AuthenticationScheme;
               })
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = true,
                       ValidIssuer = builder.Configuration["JWT:Issuer"],
                       ValidateAudience = true,
                       ValidAudience = builder.Configuration["JWT:Audience"],
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(
                           System.Text.Encoding.UTF8.GetBytes(
                               builder.Configuration["JWT:SigningKey"]
                           )
                       )
                   };
               });
            // DbContext
            #region 
            builder.Services.AddEntityFrameworkNpgsql().AddDbContext<ApplicationDbContext>(option =>
            {
                option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            #endregion
             // Register AutoMapper
            builder.Services.AddAutoMapper(typeof(MappingProfile));
            // Register UnitOfWork
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            //DI Repository
            #region
            builder.Services.AddScoped<IAccountRepository, AccountRepository>();

            #endregion

            //DI Service
            #region
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
            builder.Services.AddScoped<ITokenService, TokenService>();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
            #endregion

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(x =>
                    x.AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:5173")
            );


            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
