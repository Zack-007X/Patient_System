using Microsoft.EntityFrameworkCore;
using App.Database;
using Microsoft.Extensions.FileProviders;
using App.Core;
using AutoMapper;
using Autofac.Core;
using IdentityServer4.AccessTokenValidation;
using Microsoft.VisualBasic;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.Mvc;
using TTSW.Utils;
using App.Domain;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using TTSW.Constant;
using IdentityModel;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

var logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
                .MinimumLevel.Override("System", LogEventLevel.Warning)
                .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
                .Enrich.FromLogContext()
                // uncomment to write to Azure diagnostics stream
                .WriteTo.File(
                    @"D:\home\LogFiles\Application\app.api.txt",
                    fileSizeLimitBytes: 1_000_000,
                    rollOnFileSizeLimit: true,
                    shared: true,
                    flushToDiskInterval: TimeSpan.FromSeconds(1))
                .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}", theme: AnsiConsoleTheme.Code)
                .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";
var configurationBuilder = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json", optional: true, true)
                            .AddJsonFile($"appsettings.{environment}.json", true, true)
                            .AddEnvironmentVariables()
                            .Build();

string allowWebAppsInCORS = configurationBuilder["SiteInformation:appsite"];
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin();
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      });
});

FileUtil.Configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddDbContext<DataContext>(c =>
     c.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);


                      builder.Services.AddScoped<IBaseRepository<DrugHistoryEntity, Guid>, BaseRepository<DrugHistoryEntity, Guid>>();
            builder.Services.AddScoped<IDrugHistoryService, DrugHistoryService>();

            builder.Services.AddScoped<IBaseRepository<MasterDrugEntity, Guid>, BaseRepository<MasterDrugEntity, Guid>>();
            builder.Services.AddScoped<IMasterDrugService, MasterDrugService>();

            builder.Services.AddScoped<IBaseRepository<MasterGenderEntity, Guid>, BaseRepository<MasterGenderEntity, Guid>>();
            builder.Services.AddScoped<IMasterGenderService, MasterGenderService>();

            builder.Services.AddScoped<IBaseRepository<MasterPatientStateEntity, Guid>, BaseRepository<MasterPatientStateEntity, Guid>>();
            builder.Services.AddScoped<IMasterPatientStateService, MasterPatientStateService>();

            builder.Services.AddScoped<IBaseRepository<MasterPermissionEntity, Guid>, BaseRepository<MasterPermissionEntity, Guid>>();
            builder.Services.AddScoped<IMasterPermissionService, MasterPermissionService>();

            builder.Services.AddScoped<IBaseRepository<MasterPositionEntity, Guid>, BaseRepository<MasterPositionEntity, Guid>>();
            builder.Services.AddScoped<IMasterPositionService, MasterPositionService>();

            builder.Services.AddScoped<IBaseRepository<MasterPrefixEntity, Guid>, BaseRepository<MasterPrefixEntity, Guid>>();
            builder.Services.AddScoped<IMasterPrefixService, MasterPrefixService>();

            builder.Services.AddScoped<IBaseRepository<MasterRoleEntity, Guid>, BaseRepository<MasterRoleEntity, Guid>>();
            builder.Services.AddScoped<IMasterRoleService, MasterRoleService>();

            builder.Services.AddScoped<IBaseRepository<PatientEntity, Guid>, BaseRepository<PatientEntity, Guid>>();
            builder.Services.AddScoped<IPatientService, PatientService>();

            builder.Services.AddScoped<IBaseRepository<RoleHasPermissionEntity, Guid>, BaseRepository<RoleHasPermissionEntity, Guid>>();
            builder.Services.AddScoped<IRoleHasPermissionService, RoleHasPermissionService>();

            builder.Services.AddScoped<IBaseRepository<SurveyEntity, Guid>, BaseRepository<SurveyEntity, Guid>>();
            builder.Services.AddScoped<ISurveyService, SurveyService>();

            builder.Services.AddScoped<IBaseRepository<TreatmentScheduleEntity, Guid>, BaseRepository<TreatmentScheduleEntity, Guid>>();
            builder.Services.AddScoped<ITreatmentScheduleService, TreatmentScheduleService>();

            builder.Services.AddScoped<IBaseRepository<UserEntity, Guid>, BaseRepository<UserEntity, Guid>>();
            builder.Services.AddScoped<IUserService, UserService>();

            builder.Services.AddScoped<IBaseRepository<UserHasSpecialEntity, Guid>, BaseRepository<UserHasSpecialEntity, Guid>>();
            builder.Services.AddScoped<IUserHasSpecialService, UserHasSpecialService>();


                builder.Services.AddAutoMapper(typeof(DrugHistoryMappingProfile));

                builder.Services.AddAutoMapper(typeof(MasterDrugMappingProfile));

                builder.Services.AddAutoMapper(typeof(MasterGenderMappingProfile));

                builder.Services.AddAutoMapper(typeof(MasterPatientStateMappingProfile));

                builder.Services.AddAutoMapper(typeof(MasterPermissionMappingProfile));

                builder.Services.AddAutoMapper(typeof(MasterPositionMappingProfile));

                builder.Services.AddAutoMapper(typeof(MasterPrefixMappingProfile));

                builder.Services.AddAutoMapper(typeof(MasterRoleMappingProfile));

                builder.Services.AddAutoMapper(typeof(PatientMappingProfile));

                builder.Services.AddAutoMapper(typeof(RoleHasPermissionMappingProfile));

                builder.Services.AddAutoMapper(typeof(SurveyMappingProfile));

                builder.Services.AddAutoMapper(typeof(TreatmentScheduleMappingProfile));

                builder.Services.AddAutoMapper(typeof(UserMappingProfile));

                builder.Services.AddAutoMapper(typeof(UserHasSpecialMappingProfile));



builder.Services.Configure<MailConfig>(builder.Configuration.GetSection("MailServer"));



builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddHttpContextAccessor();

builder.Services.AddApiVersioning(opt =>
{
    opt.DefaultApiVersion = new ApiVersion(1, 0);
    opt.AssumeDefaultVersionWhenUnspecified = true;
    opt.ReportApiVersions = true;
    opt.ApiVersionReader = ApiVersionReader.Combine(new UrlSegmentApiVersionReader(),
                                                    new HeaderApiVersionReader("x-api-version"),
                                                    new MediaTypeApiVersionReader("x-api-version"));
});

builder.Services.AddVersionedApiExplorer(setup =>
{
    setup.GroupNameFormat = "'v'VVV";
    setup.SubstituteApiVersionInUrl = true;
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();


builder.Services.AddAuthentication("Bearer")
            .AddIdentityServerAuthentication(options =>
            {
                options.Authority = configurationBuilder["OpenIdConnect:Authority"];
                options.ApiName = configurationBuilder["OpenIdConnect:ApiName"];
                options.ApiSecret = configurationBuilder["OpenIdConnect:ApiSecret"];
                options.RequireHttpsMetadata = false;
            });

builder.Services.ConfigureOptions<ConfigureSwaggerOptions>();

var app = builder.Build();

var apiVersionDescriptionProvider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        foreach (var description in apiVersionDescriptionProvider.ApiVersionDescriptions)
        {
            options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json",
                description.GroupName.ToUpperInvariant());
        }
    });
}
else // Produciton
{
    app.UseHttpsRedirection();
}

#region HTML Configure

if (!Directory.Exists(FileUtil.GetAbsolutePath("")))
{
    Directory.CreateDirectory(FileUtil.GetAbsolutePath(""));
}

if (!Directory.Exists(FileUtil.GetAbsolutePath(@"Uploads")))
{
    Directory.CreateDirectory(FileUtil.GetAbsolutePath(@"Uploads"));
}

if (!Directory.Exists(FileUtil.GetAbsolutePath(@"Files")))
{
    Directory.CreateDirectory(FileUtil.GetAbsolutePath(@"Files"));
}

var currentDir = Directory.GetCurrentDirectory();

// Set static file for directory uploads
var rootUploadDir = FileUtil.GetDirectoryRootPath(TTSW.Constant.FilePathConstant.DirType.TempUpload);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(rootUploadDir.PhysicalPath),
    RequestPath = "/Uploads"
});

// Set static file for directory attachments
rootUploadDir = FileUtil.GetDirectoryRootPath(TTSW.Constant.FilePathConstant.DirType.Files);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(rootUploadDir.PhysicalPath),
    RequestPath = "/Files"
});

#endregion

app.MapControllers();

// apply migrations
await using var scope = app.Services.CreateAsyncScope();
await using var db = scope.ServiceProvider.GetRequiredService<DataContext>();

// seed data
await Seed.SeedAsync(db);

app.Run();
