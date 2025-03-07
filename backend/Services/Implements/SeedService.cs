using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Bogus;
using Bogus.DataSets;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using DAOs;
using Microsoft.Extensions.Configuration;
using Repositories.Queries;
using Services.Interfaces;

namespace Services.Implements
{
    public class SeedService : ISeedService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Faker _faker = new Faker();


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
                await InsertProjects(1000);
                Console.WriteLine("Database seeding completed successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error seeding database: {ex.Message}");
            }
        }

        private async Task InsertProjects(int numOfProject)
        {
            var projects = new List<Project>();
            for (int i = 0; i < numOfProject; i++)
            {
                //<==Random user==>
                var clientId = await GetRandomUserId(AccountRole.Client);
                var freelancerId = await GetRandomUserId(AccountRole.Freelancer);
                var staffId = await GetRandomUserId(AccountRole.Staff);

                //<==Random skill==>
                var skillRequireds = await GetRandomSkillIds();

                //<==Create project==>
                var project = new Project
                {
                    ProjectName = _faker.Commerce.ProductName(),
                    ProjectDescription = _faker.Lorem.Sentences(3),
                    AvailableTimeRange = _faker.Random.Int(10, 30),

                    EstimateBudget = Math.Round((decimal)_faker.Random.Decimal(100, 10000)),

                    Location = _faker.Address.Country(),
                    PostDate = _faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),

                    Status = _faker.PickRandom<ProjectStatus>(),

                    VerifyStaffId = staffId,
                    ClientId = clientId,
                    FreelancerId = freelancerId,
                };

                //<==Add random skill==>
                foreach (var skillId in skillRequireds)
                {
                    project.SkillRequired.Add(new SkillRequired { SkillId = skillId });
                }

                //<==Random milestone==>
                generateMilestones(project, _faker.Random.Int(2, 5));

                //<==Random bid==>
                generateBids(project, _faker.Random.Int(2, 10), freelancerId);

                //<==Random contract==>
                project.Contracts.Add(
                    new Contract
                    {
                        ProjectId = project.ProjectId,
                        ContractPolicy = _faker.Lorem.Sentences(3),
                        StartDate = _faker
                            .Date.Past(30, DateTime.Now.AddYears(-18))
                            .ToUniversalTime(),
                    }
                );
                //<==Random fee transaction==>
                var fee = new Transaction
                    {
                        AccountId = clientId,
                        Amount = project.EstimateBudget * 0.1m,
                        CreatedAt = _faker
                            .Date.Past(30, DateTime.Now.AddYears(-18))
                            .ToUniversalTime(),
                        Detail = "Fee for project " + project.ProjectName,
                        Status = TransactionStatus.Completed,
                        Type = TransactionType.Fee,
                    };
                _context.Add(fee);
                //<==Random milestone transaction==>
                foreach (var milestone in project.Milestones)
                {
                    var payment = new Transaction
                    {
                        AccountId = clientId,
                        Amount = project.EstimateBudget * milestone.PayAmount / 100,
                        CreatedAt = _faker
                            .Date.Past(30, DateTime.Now.AddYears(-18))
                            .ToUniversalTime(),
                        Detail = "Pay for freelancer " + freelancerId + " for finish milestone " + milestone.MilestoneName + " in project " + project.ProjectName,
                        Status = TransactionStatus.Completed,
                        Type = TransactionType.Payment,
                    };

                    var earning = new Transaction
                    {
                        AccountId = freelancerId,
                        Amount = project.EstimateBudget * milestone.PayAmount / 100,
                        CreatedAt = _faker
                            .Date.Past(30, DateTime.Now.AddYears(-18))
                            .ToUniversalTime(),
                        Detail = "Earning from client " + clientId + " for finish milestone " + milestone.MilestoneName + " in project " + project.ProjectName,
                        Status = TransactionStatus.Completed,
                        Type = TransactionType.Earnings,
                    };
                    _context.Add(earning);
                    _context.Add(payment);

                };

                projects.Add(project);
            }
            foreach (var project in projects)
            {
                _context.Add(project);
            }
            await _context.SaveChangesAsync();
            Console.WriteLine(
                $"Inserted {projects.Count} projects successfully! {projects.Count} index) "
            );
        }

        private async Task InsertSkillCategories()
        {
            var skillCategories = new List<string>
            {
                "Web Development",
                "Frontend Development",
                "Backend Development",
                "Full Stack Development",
                "JavaScript",
                "TypeScript",
                "React.js",
                "Vue.js",
                "Angular",
                "Svelte",
                "Next.js",
                "Nuxt.js",
                "HTML",
                "CSS",
                "SCSS",
                "Tailwind CSS",
                "Bootstrap",
                "Material UI",
                "jQuery",
                "WordPress Development",
                "Shopify Development",
                "WooCommerce",
                "Magento",
                "Webflow",
                "Wix Development",
                "PHP",
                "Laravel",
                "Symfony",
                "CodeIgniter",
                "Python",
                "Django",
                "Flask",
                "FastAPI",
                "Node.js",
                "Express.js",
                "NestJS",
                "Ruby on Rails",
                "Golang",
                "Java",
                "Spring Boot",
                "Kotlin",
                "Android Development",
                "iOS Development",
                "Swift",
                "Objective-C",
                "Flutter",
                "React Native",
                "Xamarin",
                "Ionic",
                "Firebase",
                "PostgreSQL",
                "MySQL",
                "SQLite",
                "MongoDB",
                "Redis",
                "DynamoDB",
                "GraphQL",
                "REST API",
                "SOAP API",
                "Microservices",
                "Docker",
                "Kubernetes",
                "CI/CD Pipelines",
                "Jenkins",
                "Git",
                "GitHub",
                "GitLab",
                "Bitbucket",
                "AWS",
                "Azure",
                "Google Cloud Platform (GCP)",
                "Terraform",
                "Ansible",
                "Cybersecurity",
                "Ethical Hacking",
                "Penetration Testing",
                "Network Security",
                "Blockchain Development",
                "Smart Contracts",
                "Solidity",
                "Ethereum",
                "Binance Smart Chain (BSC)",
                "Web3.js",
                "Rust",
                "C++",
                "C#",
                "Unity Development",
                "Unreal Engine",
                "Game Development",
                "AR/VR Development",
                "3D Modeling",
                "Blender",
                "Maya",
                "Cinema 4D",
                "AutoCAD",
                "SketchUp",
                "Graphic Design",
                "UI/UX Design",
                "Adobe Photoshop",
                "Adobe Illustrator",
                "Adobe XD",
                "Figma",
                "Canva",
                "CorelDRAW",
                "InDesign",
                "Logo Design",
                "Branding",
                "Motion Graphics",
                "Video Editing",
                "Adobe Premiere Pro",
                "Final Cut Pro",
                "DaVinci Resolve",
                "After Effects",
                "Animation",
                "2D Animation",
                "3D Animation",
                "Whiteboard Animation",
                "Explainer Videos",
                "Copywriting",
                "SEO Writing",
                "Technical Writing",
                "Blog Writing",
                "Article Writing",
                "Creative Writing",
                "Ghostwriting",
                "Scriptwriting",
                "Resume Writing",
                "Business Writing",
                "Translation Services",
                "Transcription",
                "Proofreading",
                "Editing",
                "Content Marketing",
                "Digital Marketing",
                "Social Media Marketing",
                "Facebook Marketing",
                "Instagram Marketing",
                "LinkedIn Marketing",
                "Twitter Marketing",
                "TikTok Marketing",
                "YouTube Marketing",
                "Email Marketing",
                "SMS Marketing",
                "Affiliate Marketing",
                "Influencer Marketing",
                "PPC Advertising",
                "Google Ads",
                "Facebook Ads",
                "LinkedIn Ads",
                "Instagram Ads",
                "Twitter Ads",
                "TikTok Ads",
                "Bing Ads",
                "SEO (Search Engine Optimization)",
                "On-Page SEO",
                "Off-Page SEO",
                "Technical SEO",
                "Local SEO",
                "Keyword Research",
                "Backlink Building",
                "Google Analytics",
                "Google Search Console",
                "Website Auditing",
                "Lead Generation",
                "CRM Management",
                "HubSpot",
                "Salesforce",
                "Zoho CRM",
                "Business Development",
                "Sales Strategy",
                "Cold Calling",
                "Email Outreach",
                "Customer Support",
                "Virtual Assistance",
                "Data Entry",
                "Market Research",
                "Project Management",
                "Scrum Master",
                "Agile Methodology",
                "Jira",
                "Trello",
                "Asana",
                "Monday.com",
                "ClickUp",
                "Notion",
                "Finance Consulting",
                "Accounting",
                "QuickBooks",
                "Xero",
                "SAP",
                "Bookkeeping",
                "Financial Analysis",
                "Financial Modeling",
                "Investment Research",
                "Stock Trading",
                "Cryptocurrency Trading",
                "Forex Trading",
                "Risk Management",
                "Business Analysis",
                "Data Science",
                "Machine Learning",
                "Deep Learning",
                "Artificial Intelligence",
                "TensorFlow",
                "PyTorch",
                "Keras",
                "Scikit-Learn",
                "Computer Vision",
                "Natural Language Processing",
                "Big Data",
                "Apache Spark",
                "Hadoop",
                "Data Engineering",
                "ETL Pipelines",
                "Snowflake",
                "Power BI",
                "Tableau",
                "Data Visualization",
                "Cloud Computing",
                "Serverless Computing",
                "IoT Development",
                "Embedded Systems",
                "Robotics",
                "Automation",
                "Process Optimization",
                "DevOps",
                "Site Reliability Engineering (SRE)",
                "Performance Tuning",
                "High Availability Systems",
                "Quantum Computing",
                "Bioinformatics",
                "Scientific Computing",
                "Mathematical Modeling",
                "Actuarial Science",
                "Econometrics",
                "Game Theory",
                "Cyber Law",
                "Intellectual Property Law",
                "Regulatory Compliance",
                "GDPR Compliance",
                "Legal Writing",
                "Public Relations",
                "Corporate Communications",
                "Brand Management",
                "Event Planning",
                "Fundraising",
                "Grant Writing",
                "Non-Profit Management",
                "HR Consulting",
                "Employee Training",
                "Recruitment & Talent Acquisition",
                "HR Analytics",
                "Workforce Planning",
                "Organizational Development",
                "Leadership Coaching",
                "Psychometric Testing",
                "Education & E-Learning",
                "Curriculum Development",
                "Instructional Design",
                "Online Course Creation",
                "Tutoring",
                "Standardized Test Preparation",
                "Life Coaching",
                "Personal Finance Advising",
                "Real Estate Investment",
                "Supply Chain Management",
                "Logistics",
                "E-commerce Strategy",
                "Dropshipping",
                "Amazon FBA",
                "Customer Journey Mapping",
                "User Research",
                "Growth Hacking",
                "Venture Capital Analysis",
                "Business Valuation",
                "Lean Startup Methodology",
                "Design Thinking",
                "Agile Coaching",
                "Kaizen",
                "Six Sigma",
                "Lean Manufacturing",
                "Environmental Consulting",
                "Sustainability Strategy",
            };

            foreach (var skill in skillCategories)
            {
                _context.Add(new SkillCategory { SkillName = skill });
            }

            await _context.SaveChangesAsync();
            Console.WriteLine(
                $"Inserted skill categories successfully! {skillCategories.Count} index) "
            );
        }

        private Account GenerateFakeAccount()
        {
            var password = "12345678";
            var hashedPassword = HashPassword(password);
            var random = new Random();

            var faker = new Faker();

            return new Account
            {
                Role = Enum.TryParse<AccountRole>(
                    random.Next(2) == 0 ? "Freelancer" : "Client",
                    out var role
                )
                    ? role
                    : AccountRole.Client,
                Name = faker.Name.FullName(),
                Email = faker.Internet.Email(),
                Password = hashedPassword,
                Phone = faker.Phone.PhoneNumber(),
                Address = faker.Address.StreetAddress(),
                Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(), // Ngẫu nhiên từ 18 đến 48 tuổi
                Gender = Enum.TryParse<Gender>(
                    random.Next(2) == 0 ? "Male" : "Female",
                    out var gender
                )
                    ? gender
                    : Gender.Other,
                ReputationPoint = random.Next(0, 1000),
                TotalCredit = 0,
                LockCredit = 0,
                CreatedAt = DateTime.UtcNow.ToUniversalTime(),
                Status = AccountStatus.Active,
                AvatarURL =
                    "https://firebasestorage.googleapis.com/v0/b/datj-diamond.appspot.com/o/images%2F07cad7d6-549b-453f-a551-df41f767ef9a?alt=media&token=1d8db5a1-d8ea-4fda-ae12-673406cf7824",
                Nationality = faker.Address.Country(),
            };
        }

        private string HashPassword(string password)
        {
            using var rng = RandomNumberGenerator.Create();
            byte[] salt = new byte[16];
            rng.GetBytes(salt);

            using var pbkdf2 = new Rfc2898DeriveBytes(
                password,
                salt,
                10000,
                HashAlgorithmName.SHA1
            );
            byte[] hash = pbkdf2.GetBytes(32);

            return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
        }

        private async Task InsertFakeAccounts(int count)
        {
            var accounts = new List<Account>();
            var random = new Random();
            var faker = new Faker();
            accounts.Add(
                new Account
                {
                    Name = "Đỗ Long Admin",
                    Role = AccountRole.Admin,
                    Email = "admin@gmail.com",
                    Password = HashPassword("12345678"),
                    Phone = faker.Phone.PhoneNumber(),
                    Address = faker.Address.StreetAddress(),
                    Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                    Gender = Enum.TryParse<Gender>(
                        random.Next(2) == 0 ? "Male" : "Female",
                        out var gender
                    )
                        ? gender
                        : Gender.Other,
                    ReputationPoint = 200,
                    TotalCredit = 0,
                    LockCredit = 0,
                    AvatarURL =
                        "https://firebasestorage.googleapis.com/v0/b/datj-diamond.appspot.com/o/images%2F07cad7d6-549b-453f-a551-df41f767ef9a?alt=media&token=1d8db5a1-d8ea-4fda-ae12-673406cf7824",
                    CreatedAt = DateTime.UtcNow.ToUniversalTime(),
                    Status = AccountStatus.Active,
                    Nationality = faker.Address.Country(),
                }
            );
            accounts.Add(
                new Account
                {
                    Name = "Võ Đỗ Quang Staff",
                    Role = AccountRole.Staff,
                    Email = "staff@gmail.com",
                    Password = HashPassword("12345678"),
                    Phone = faker.Phone.PhoneNumber(),
                    Address = faker.Address.StreetAddress(),
                    Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                    Gender = Enum.TryParse<Gender>(
                        random.Next(2) == 0 ? "Male" : "Female",
                        out gender
                    )
                        ? gender
                        : Gender.Other,
                    ReputationPoint = 200,
                    TotalCredit = 0,
                    LockCredit = 0,
                    AvatarURL =
                        "https://firebasestorage.googleapis.com/v0/b/datj-diamond.appspot.com/o/images%2F07cad7d6-549b-453f-a551-df41f767ef9a?alt=media&token=1d8db5a1-d8ea-4fda-ae12-673406cf7824",
                    CreatedAt = DateTime.UtcNow.ToUniversalTime(),
                    Status = AccountStatus.Active,
                    Nationality = faker.Address.Country(),
                }
            );
            accounts.Add(
                new Account
                {
                    Name = "Nguyễn Viết Client",
                    Role = AccountRole.Client,
                    Email = "client@gmail.com",
                    Password = HashPassword("12345678"),
                    Phone = faker.Phone.PhoneNumber(),
                    Address = faker.Address.StreetAddress(),
                    Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                    Gender = Enum.TryParse<Gender>(
                        random.Next(2) == 0 ? "Male" : "Female",
                        out gender
                    )
                        ? gender
                        : Gender.Other,
                    ReputationPoint = 200,
                    TotalCredit = 0,
                    LockCredit = 0,
                    AvatarURL =
                        "https://firebasestorage.googleapis.com/v0/b/datj-diamond.appspot.com/o/images%2F07cad7d6-549b-453f-a551-df41f767ef9a?alt=media&token=1d8db5a1-d8ea-4fda-ae12-673406cf7824",
                    CreatedAt = DateTime.UtcNow.ToUniversalTime(),
                    Status = AccountStatus.Active,
                    Nationality = faker.Address.Country(),
                }
            );
            accounts.Add(
                new Account
                {
                    Name = "Lê Thế Freelancer",
                    Role = AccountRole.Freelancer,
                    Email = "freelancer@gmail.com",
                    Password = HashPassword("12345678"),
                    Phone = faker.Phone.PhoneNumber(),
                    Address = faker.Address.StreetAddress(),
                    Birthday = faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                    Gender = Enum.TryParse<Gender>(
                        random.Next(2) == 0 ? "Male" : "Female",
                        out gender
                    )
                        ? gender
                        : Gender.Other,
                    ReputationPoint = 200,
                    TotalCredit = 0,
                    LockCredit = 0,
                    AvatarURL =
                        "https://firebasestorage.googleapis.com/v0/b/datj-diamond.appspot.com/o/images%2F07cad7d6-549b-453f-a551-df41f767ef9a?alt=media&token=1d8db5a1-d8ea-4fda-ae12-673406cf7824",
                    CreatedAt = DateTime.UtcNow,
                    Status = AccountStatus.Active,
                    Nationality = faker.Address.Country(),
                }
            );
            for (int i = 0; i < count; i++)
            {
                accounts.Add(GenerateFakeAccount());
            }

            await _context.Accounts.AddRangeAsync(accounts);
            await _context.SaveChangesAsync();

            Console.WriteLine($"Inserted {accounts.Count} fake accounts successfully!");
        }

        private async Task<Account> GetRandomUser(AccountRole role)
        {
            var clients = _context.Accounts.Where(a => a.Role == role).ToList();
            // random a number between 0 and client.Count
            var random = new Random();
            var index = random.Next(0, clients.Count);
            // get client account
            var client = clients[index];
            return client;
        }

        private async Task<long> GetRandomUserId(AccountRole role)
        {
            var clients = _context.Accounts.Where(a => a.Role == role).ToList();
            // random a number between 0 and client.Count
            var random = new Random();
            var index = random.Next(0, clients.Count);
            // get client account
            var client = clients[index];
            return client.AccountId;
        }

        private async Task<ICollection<long>> GetRandomSkillIds()
        {
            // Get not dupplicate skillids with bogus
            var random = new Random();
            var skillIds = new HashSet<long>();
            while (skillIds.Count < 5)
            {
                var skillId = random.Next(1, 283);
                skillIds.Add(skillId);
            }
            return skillIds;
        }
        private void generateMilestones(Project project, int numOfMilestone)
        {
            var milestones = new List<Milestone>();
            Random rand = new Random();
            decimal remainingBudget = 100;
            List<decimal> payAmounts = new List<decimal>();

            // Tạo danh sách PayAmount sao cho tổng = 100
            for (int i = 0; i < numOfMilestone - 1; i++)
            {
                // Random payamount so that always sum of payAmount = 100
                decimal amount = Math.Round((decimal)rand.NextDouble() * (remainingBudget - (numOfMilestone - i - 1)) + 1, 2);
                payAmounts.Add(amount);
                remainingBudget -= amount;
            }
            payAmounts.Add(Math.Round(remainingBudget, 2));

            for (int j = 0; j < numOfMilestone; j++)
            {
                project.Milestones.Add(
                    new Milestone
                    {
                        ProjectId = project.ProjectId,
                        MilestoneName = "No. " + (j + 1) + " of Prj. " + project.ProjectName,
                        Status = Enum.TryParse<MilestoneStatus>(
                            _faker.Random.Word(),
                            out var milestoneStatus
                        )
                            ? milestoneStatus
                            : MilestoneStatus.Completed,
                        DeadlineDate = _faker
                            .Date.Past(30, DateTime.Now.AddYears(-18))
                            .ToUniversalTime(),
                        MilestoneDescription = _faker.Lorem.Sentences(3),
                        PayAmount = payAmounts[j],
                    }
                );
            }
        }

        private async void generateBids(Project project, int numOfBid, long freelancerId)
        {
            HashSet<long> usedBidOwnerIds = new HashSet<long>(); // Để đảm bảo không có ID bị trùng
            Random rand = new Random();

            for (int j = 0; j < numOfBid; j++)
            {
                try
                {
                    long bidOwnerId;

                    if (j == 0)
                    {
                        // Bid đầu tiên sẽ có ownerId là freelancerId
                        bidOwnerId = freelancerId;
                    }
                    else
                    {
                        // Lấy ngẫu nhiên userId, đảm bảo không trùng
                        do
                        {
                            bidOwnerId = await GetRandomUserId(AccountRole.Freelancer);
                        } while (usedBidOwnerIds.Contains(bidOwnerId));
                    }

                    // Thêm vào danh sách các ownerId đã sử dụng
                    usedBidOwnerIds.Add(bidOwnerId);

                    // Thêm bid vào danh sách của project
                    project.Bids.Add(new Bid
                    {
                        ProjectId = project.ProjectId,
                        BidOwnerId = bidOwnerId,
                        BidOffer = Math.Round(project.EstimateBudget * _faker.Random.Decimal(80, 200) / 100, 2),
                        CreatedAt = _faker.Date.Past(30, DateTime.Now.AddYears(-18)).ToUniversalTime(),
                        BidDescription = _faker.Lorem.Sentences(3),
                    });
                    
                }
                catch (Exception)
                {
                    throw new Exception("Lỗi khi tạo bid.");
                }
            }
        }

    }
}
