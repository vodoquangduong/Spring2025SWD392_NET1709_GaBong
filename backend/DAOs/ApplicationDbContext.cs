using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAOs
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {
            this.Database.SetCommandTimeout(300);
        }

        public ApplicationDbContext() { }
        
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Project> Projects { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfiguration config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("dbsettings.json", true, true)
                    .Build();

              Console.WriteLine(config.ToString()); 
                var connectionString = config["ConnectionStrings:DefaultConnection"];

                Console.WriteLine($"Current directory: {Directory.GetCurrentDirectory()}");
                Console.WriteLine("Connection string: " + connectionString);

                optionsBuilder.UseNpgsql(
                    connectionString
                    , options => options.CommandTimeout(300)
                );
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Milestone>().Property(e => e.Status).HasConversion<string>();
            modelBuilder.Entity<Report>().Property(e => e.Status).HasConversion<string>();
            modelBuilder.Entity<Portfolio>().Property(e => e.Status).HasConversion<string>();
            // Configure Account entity
            modelBuilder.Entity<Account>(entity =>
            {
                // Configure enum conversions
                entity.Property(d => d.Role).HasConversion<string>();
                entity.Property(d => d.Gender).HasConversion<string>();
                entity.Property(d => d.Status).HasConversion<string>();

                // Configure relationships
                entity.HasMany(e => e.ClientProjects)
                    .WithOne(e => e.Client)
                    .HasForeignKey("ClientId")
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.FreelancerProjects)
                    .WithOne(e => e.Freelancer)
                    .HasForeignKey("FreelancerId")
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.VerifyStaffIdProjects)
                    .WithOne(e => e.Verifier)
                    .HasForeignKey("VerifyStaffId")
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.SenderReports)
                    .WithOne(e => e.Sender)
                    .HasForeignKey("SenderId")
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.VerifiedReports)
                    .WithOne(e => e.VerifyStaff)
                    .HasForeignKey("VerifyStaffId")
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.SkillPerforms)
                    .WithOne(e => e.Account)
                    .HasForeignKey(e => e.AccountId);

                entity.HasOne(e => e.Portfolio)
                    .WithOne(e => e.Account)
                    .HasForeignKey<Portfolio>("FreelancerId");

                entity.HasMany(e => e.Bids)
                    .WithOne(e => e.BidOwner)
                    .HasForeignKey("BidOwnerId");

                entity.HasMany(e => e.Notifications)
                    .WithOne(e => e.Account)
                    .HasForeignKey(e => e.AccountId);

                entity.HasMany(e => e.Transactions)
                    .WithOne(e => e.Account)
                    .HasForeignKey(e => e.AccountId);

                entity.HasMany(e => e.SenderChats)
                    .WithOne(e => e.Sender)
                    .HasForeignKey("SenderId")
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.ReceiverChats)
                    .WithOne(e => e.Receiver)
                    .HasForeignKey("ReceiverId")
                    .OnDelete(DeleteBehavior.Restrict);
            });
            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Status).HasConversion<string>();
                entity.HasMany(e => e.Reports)
                    .WithOne(e => e.Project)
                    .HasForeignKey("ProjectId");
                entity.HasMany(e => e.SkillRequired)
                    .WithOne(e => e.Project)
                    .HasForeignKey("ProjectId");
                entity.HasMany(e => e.Milestones)
                    .WithOne(e => e.Project)
                    .HasForeignKey("ProjectId");
                entity.HasMany(e => e.Contracts)
                    .WithOne(e => e.Project)
                    .HasForeignKey("ProjectId");
                entity.HasMany(e => e.Feedbacks)
                    .WithOne(e => e.Project)
                    .HasForeignKey("ProjectId");
            });
            modelBuilder.Entity<SkillCategory>(entity =>
            {
                entity.HasMany(e => e.SkillRequired)
                    .WithOne(e => e.SkillCategory)
                    .HasForeignKey("SkillId");
                entity.HasMany(e => e.SkillPerforms)
                    .WithOne(e => e.SkillCategory)
                    .HasForeignKey("SkillId");
            });
            
            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.Property(e => e.Status).HasConversion<string>();
                entity.Property(e => e.Type).HasConversion<string>();
            });
             modelBuilder.Entity<Notification>(entity =>
            {
                entity.Property(e => e.Status).HasConversion<string>();
                entity.Property(e => e.Type).HasConversion<string>();
            });
        }
    }
}
