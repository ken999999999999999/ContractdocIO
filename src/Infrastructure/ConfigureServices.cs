using ContactdocIO.Application.Common.Interfaces;
using ContactdocIO.Infrastructure.Files;
using ContactdocIO.Infrastructure.Identity;
using ContactdocIO.Infrastructure.Persistence;
using ContactdocIO.Infrastructure.Persistence.Interceptors;
using ContactdocIO.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<AuditableEntitySaveChangesInterceptor>();

        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("ContactdocIODb"));
        }
        else
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("ContactdocIOConnection"),
                    builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();

        services
            .AddDefaultIdentity<ApplicationUser>(options =>
            {
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddIdentityServer(options =>
        {
            options.IssuerUri = configuration["IdentityServer:Issuer"];
        }).AddApiAuthorization<ApplicationUser, ApplicationDbContext>(options =>
             {
                 options.Clients.AddIdentityServerSPA(configuration["IdentityServer:ClientId"], SPA =>
                 {
                     SPA.WithRedirectUri("/silent-callback/")
                     .WithRedirectUri("/login-callback/")
                     .WithLogoutRedirectUri("/logout-callback/");
                 });
             });


        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<IIdentityService, IdentityService>();
        services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();

        services.AddAuthentication()
            .AddIdentityServerJwt()
            .AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = configuration["IdentityServer:Google:ClientId"];
                googleOptions.ClientSecret = configuration["IdentityServer:Google:ClientSecret"];
                googleOptions.SaveTokens = true;
            });

        services.AddAuthorization(options =>
            options.AddPolicy("CanPurge", policy => policy.RequireRole("Administrator")));

        return services;
    }
}
