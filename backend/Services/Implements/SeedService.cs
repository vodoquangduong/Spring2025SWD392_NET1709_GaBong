using Bogus;
using Bogus.DataSets;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using DAOs;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implements
{
    public class SeedService : ISeedService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public SeedService(ApplicationDbContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
        }

        public async Task ResetDatabaseAsync()
        {
            try
            {
                await _context.Database.EnsureDeletedAsync(); // Xóa database
                await _context.Database.EnsureCreatedAsync(); // Tạo lại database

                Console.WriteLine("Database has been reset successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error resetting database: {ex.Message}");
            }
        }

        public async Task CreateSeedAsync()
        {
            try
            {
                await InsertSkillCategories();
                await InsertFakeAccounts(95);
                Console.WriteLine("Database seeding completed successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error seeding database: {ex.Message}");
            }
        }

        private async Task InsertSkillCategories()
        {
            var skillCategories = new List<string>
        {
            "Web Development", "Mobile Development", "Data Science", "Machine Learning",
            "Cybersecurity", "Cloud Computing", "Blockchain", "UI/UX Design",
            "Project Management", "Marketing", "Finance", "Business Analysis",
            "Graphic Design", "SEO Optimization", "Game Development", "HTML", "CSS",
            "Java", ".NET", "AWS"
        };


            foreach (var skill in skillCategories)
            {
                _context.Add(new SkillCategory { SkillName = skill });
            }

            await _context.SaveChangesAsync();
            Console.WriteLine("Inserted skill categories successfully!");
        }

        private Account GenerateFakeAccount()
        {
            var password = "12345678";
            var hashedPassword = HashPassword(password);
            var random = new Random();

            var faker = new Faker();

            return new Account
            {
                Role = Enum.TryParse<AccountRole>(random.Next(2) == 0 ? "Freelancer" : "Client", out var role) ? role : AccountRole.Client,
                Name = faker.Name.FullName(),
                Email = faker.Internet.Email(),
                Password = hashedPassword,
                Phone = faker.Phone.PhoneNumber(),
                Address = faker.Address.StreetAddress(),
                Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(), // Ngẫu nhiên từ 18 đến 48 tuổi
                Gender = Enum.TryParse<Gender>(random.Next(2) == 0 ? "Male" : "Female", out var gender) ? gender : Gender.Other,
                ReputationPoint = random.Next(0, 1000),
                TotalCredit = (Decimal)Math.Round(random.NextDouble() * (10000 - 500) + 500, 2),
                LockCredit = (Decimal)Math.Round(random.NextDouble() * 500, 2),
                CreatedAt = DateTime.UtcNow.ToUniversalTime(),
                Status = AccountStatus.Active,
                AvatarURL = "https://i.pravatar.cc/500",
                Nationality = faker.Address.Country()
            };
        }

        private string HashPassword(string password)
        {
            using var rng = RandomNumberGenerator.Create();
            byte[] salt = new byte[16];
            rng.GetBytes(salt);

            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA1);
            byte[] hash = pbkdf2.GetBytes(32);

            return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
        }

        private async Task InsertFakeAccounts(int count)
        {
            var accounts = new List<Account>();
            var random = new Random();
            var faker = new Faker();
            accounts.Add(new Account
            {
                Name = "Đỗ Long Admin",
                Role = AccountRole.Admin,
                Email = "admin@gmail.com",
                Password = HashPassword("12345678"),
                Phone = faker.Phone.PhoneNumber(),
                Address = faker.Address.StreetAddress(),
                Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                Gender = Enum.TryParse<Gender>(random.Next(2) == 0 ? "Male" : "Female", out var gender) ? gender : Gender.Other,
                ReputationPoint = random.Next(0, 1000),
                TotalCredit = (Decimal)Math.Round(random.NextDouble() * (10000 - 500) + 500, 2),
                LockCredit = (Decimal)Math.Round(random.NextDouble() * 500, 2),
                CreatedAt = DateTime.UtcNow.ToUniversalTime(),
                Status = AccountStatus.Active,
                Nationality = faker.Address.Country()
            });
            accounts.Add(new Account
            {
                Name = "Võ Đỗ Quang Staff",
                Role = AccountRole.Staff,
                Email = "staff@gmail.com",
                Password = HashPassword("12345678"),
                Phone = faker.Phone.PhoneNumber(),
                Address = faker.Address.StreetAddress(),
                Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                Gender = Enum.TryParse<Gender>(random.Next(2) == 0 ? "Male" : "Female", out gender) ? gender : Gender.Other,
                ReputationPoint = random.Next(0, 1000),
                TotalCredit = (Decimal)Math.Round(random.NextDouble() * (10000 - 500) + 500, 2),
                LockCredit = (Decimal)Math.Round(random.NextDouble() * 500, 2),
                CreatedAt = DateTime.UtcNow.ToUniversalTime(),
                Status = AccountStatus.Active,
                Nationality = faker.Address.Country()
            });
            accounts.Add(new Account
            {
                Name = "Nguyễn Viết Client",
                Role = AccountRole.Client,
                Email = "client@gmail.com",
                Password = HashPassword("12345678"),
                Phone = faker.Phone.PhoneNumber(),
                Address = faker.Address.StreetAddress(),
                Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                Gender = Enum.TryParse<Gender>(random.Next(2) == 0 ? "Male" : "Female", out gender) ? gender : Gender.Other,
                ReputationPoint = random.Next(0, 1000),
                TotalCredit = (Decimal)Math.Round(random.NextDouble() * (10000 - 500) + 500, 2),
                LockCredit = (Decimal)Math.Round(random.NextDouble() * 500, 2),
                CreatedAt = DateTime.UtcNow.ToUniversalTime(),
                Status = AccountStatus.Active,
                Nationality = faker.Address.Country()
            });
            accounts.Add(new Account
            {
                Name = "Lê Thế Freelancer",
                Role = AccountRole.Freelancer,
                Email = "admin@gmail.com",
                Password = HashPassword("12345678"),
                Phone = faker.Phone.PhoneNumber(),
                Address = faker.Address.StreetAddress(),
                Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                Gender = Enum.TryParse<Gender>(random.Next(2) == 0 ? "Male" : "Female", out gender) ? gender : Gender.Other,
                ReputationPoint = random.Next(0, 1000),
                TotalCredit = (Decimal)Math.Round(random.NextDouble() * (10000 - 500) + 500, 2),
                LockCredit = (Decimal)Math.Round(random.NextDouble() * 500, 2),
                CreatedAt = DateTime.UtcNow,
                Status = AccountStatus.Active,
                Nationality = faker.Address.Country()
            });
            for (int i = 0; i < count; i++)
            {
                accounts.Add(GenerateFakeAccount());
            }
            
            await _context.Accounts.AddRangeAsync(accounts);
            await _context.SaveChangesAsync();

            Console.WriteLine($"Inserted {count} fake accounts successfully!");
        }
    }
}
