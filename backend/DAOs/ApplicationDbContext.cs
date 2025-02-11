using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAOs
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public ApplicationDbContext() { }
        
        public DbSet<Account> Accounts { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfiguration config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("dbsettings.json", true, true)
                    .Build();

              Console.WriteLine(config.ToString()); 
                //var connectionString = config.GetConnectionString("DefaultConnection");
                var connectionString = config["ConnectionStrings:DefaultConnection"];

                Console.WriteLine($"Current directory: {Directory.GetCurrentDirectory()}");
                Console.WriteLine("Connection string: " + connectionString);

                optionsBuilder.UseNpgsql(
                    connectionString
                    //, options => options.CommandTimeout(300)
                );
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Account>().Property(d => d.Role).HasConversion<string>();
            modelBuilder.Entity<Account>().Property(d => d.Gender).HasConversion<string>();
        }
    }
}
