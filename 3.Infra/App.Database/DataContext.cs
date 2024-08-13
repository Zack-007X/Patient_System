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

        public DbSet<BookingEntity> Bookings { get; set; }
        public DbSet<CustomerEntity> Customers { get; set; }
        public DbSet<PaymentEntity> Payments { get; set; }
        public DbSet<RepairEntity> Repairs { get; set; }
        public DbSet<UserEntity> Users { get; set; }


        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }       
    }
}


