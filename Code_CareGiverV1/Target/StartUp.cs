            builder.Services.AddScoped<IBaseRepository<DrugHistoryEntity, Guid>, BaseRepository<DrugHistoryEntity, Guid>>();
            builder.Services.AddScoped<IDrugHistoryService, DrugHistoryService>();

            builder.Services.AddScoped<IBaseRepository<MasterDrugEntity, Guid>, BaseRepository<MasterDrugEntity, Guid>>();
            builder.Services.AddScoped<IMasterDrugService, MasterDrugService>();

            builder.Services.AddScoped<IBaseRepository<MasterGenderEntity, Guid>, BaseRepository<MasterGenderEntity, Guid>>();
            builder.Services.AddScoped<IMasterGenderService, MasterGenderService>();

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


        public DbSet<DrugHistoryEntity> DrugHistorys { get; set; }
        public DbSet<MasterDrugEntity> MasterDrugs { get; set; }
        public DbSet<MasterGenderEntity> MasterGenders { get; set; }
        public DbSet<MasterPermissionEntity> MasterPermissions { get; set; }
        public DbSet<MasterPositionEntity> MasterPositions { get; set; }
        public DbSet<MasterPrefixEntity> MasterPrefixs { get; set; }
        public DbSet<MasterRoleEntity> MasterRoles { get; set; }
        public DbSet<PatientEntity> Patients { get; set; }
        public DbSet<RoleHasPermissionEntity> RoleHasPermissions { get; set; }
        public DbSet<SurveyEntity> Surveys { get; set; }
        public DbSet<TreatmentScheduleEntity> TreatmentSchedules { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<UserHasSpecialEntity> UserHasSpecials { get; set; }
