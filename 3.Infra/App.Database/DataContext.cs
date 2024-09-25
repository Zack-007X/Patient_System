using System;
using Microsoft.EntityFrameworkCore;
using App.Core;
using Microsoft.Extensions.Configuration;
using App.Domain;
using Microsoft.Extensions.Hosting;

namespace App.Database
{
    
    public class DataContext : DbContext
    {

        public DbSet<DrugHistoryEntity> DrugHistorys { get; set; }
        public DbSet<MasterDrugEntity> MasterDrugs { get; set; }
        public DbSet<MasterGenderEntity> MasterGenders { get; set; }
        public DbSet<MasterPatientStateEntity> MasterPatientStates { get; set; }
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


        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }       
    }
}


