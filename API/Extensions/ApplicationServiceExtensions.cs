using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extentions
{
    public static class ApplicationServiceExtensions //Static - so we dont need to create a new instance of this class when we use our extension matod
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config) //QF on IServiceCollection -> Using MS.Extensions.DepenancyInjection & IConfiguration -> Using MS.Extension.Configuration
    {
           services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly); //This tells the mediator where to find the Query handlers. DL from Nuget. 
            services.AddAutoMapper(typeof(MappingProfiles).Assembly); //QF MappingProfile -> Using ApplicationCore

            return services;
    }
    }
}