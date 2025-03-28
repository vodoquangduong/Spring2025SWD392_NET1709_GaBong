﻿// <auto-generated />
using System;
using DAOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DAOs.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250222174009_AddTableForMessage")]
    partial class AddTableForMessage
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BusinessObjects.Models.Account", b =>
                {
                    b.Property<long>("AccountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("account_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("AccountId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("address");

                    b.Property<string>("AvatarURL")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("avatar_url");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("birthday");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("gender");

                    b.Property<decimal>("LockCredit")
                        .HasColumnType("numeric")
                        .HasColumnName("lock_credit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Nationality")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nationality");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("phone");

                    b.Property<int>("ReputationPoint")
                        .HasColumnType("integer")
                        .HasColumnName("reputation_point");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("role");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<decimal>("TotalCredit")
                        .HasColumnType("numeric")
                        .HasColumnName("total_credit");

                    b.HasKey("AccountId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("BusinessObjects.Models.Bid", b =>
                {
                    b.Property<long>("BidId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("bid_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("BidId"));

                    b.Property<string>("BidDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("bid_description");

                    b.Property<decimal>("BidOffer")
                        .HasColumnType("numeric")
                        .HasColumnName("bid_offer");

                    b.Property<long>("BidOwnerId")
                        .HasColumnType("bigint")
                        .HasColumnName("bid_owner_id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<long>("ProjectId")
                        .HasColumnType("bigint")
                        .HasColumnName("project_id");

                    b.HasKey("BidId");

                    b.HasIndex("BidOwnerId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Bid");
                });

            modelBuilder.Entity("BusinessObjects.Models.ChatRoom", b =>
                {
                    b.Property<long>("ChatRoomID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("chat_room_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ChatRoomID"));

                    b.Property<string>("ChatRoomName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("chat_room_name");

                    b.HasKey("ChatRoomID");

                    b.ToTable("ChatRoom");
                });

            modelBuilder.Entity("BusinessObjects.Models.Contract", b =>
                {
                    b.Property<long>("ContractId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("contract_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ContractId"));

                    b.Property<string>("ContractPolicy")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("contract_policy");

                    b.Property<long>("ProjectId")
                        .HasColumnType("bigint")
                        .HasColumnName("project_id");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.HasKey("ContractId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Contract");
                });

            modelBuilder.Entity("BusinessObjects.Models.Feedback", b =>
                {
                    b.Property<long>("FeedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("feedback_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("FeedbackId"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("FeedbackComment")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("feedback_comment");

                    b.Property<long>("ProjectId")
                        .HasColumnType("bigint")
                        .HasColumnName("project_id");

                    b.Property<int>("Rating")
                        .HasColumnType("integer")
                        .HasColumnName("rating");

                    b.HasKey("FeedbackId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Feedback");
                });

            modelBuilder.Entity("BusinessObjects.Models.Messages", b =>
                {
                    b.Property<long>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("message_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("MessageId"));

                    b.Property<long>("ChatRoomId")
                        .HasColumnType("bigint")
                        .HasColumnName("chat_room_id");

                    b.Property<string>("MessageContent")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("message_content");

                    b.Property<DateTime>("SendAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("send_at");

                    b.Property<long>("SenderId")
                        .HasColumnType("bigint")
                        .HasColumnName("sender_id");

                    b.HasKey("MessageId");

                    b.HasIndex("ChatRoomId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("BusinessObjects.Models.Milestone", b =>
                {
                    b.Property<long>("MilestoneId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("milestone_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("MilestoneId"));

                    b.Property<DateTime>("DeadlineDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("deadline_date");

                    b.Property<string>("MilestoneDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("milestone_description");

                    b.Property<decimal>("PayAmount")
                        .HasColumnType("numeric")
                        .HasColumnName("pay_amount");

                    b.Property<long>("ProjectId")
                        .HasColumnType("bigint")
                        .HasColumnName("project_id");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.HasKey("MilestoneId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Milestone");
                });

            modelBuilder.Entity("BusinessObjects.Models.Notification", b =>
                {
                    b.Property<long>("NotificationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("notification_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("NotificationId"));

                    b.Property<long>("AccountId")
                        .HasColumnType("bigint")
                        .HasColumnName("account_id");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("content");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<DateTime>("Time")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("time");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("type");

                    b.HasKey("NotificationId");

                    b.HasIndex("AccountId");

                    b.ToTable("Notification");
                });

            modelBuilder.Entity("BusinessObjects.Models.Portfolio", b =>
                {
                    b.Property<long>("PortfolioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("portfolio_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("PortfolioId"));

                    b.Property<string>("About")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("about");

                    b.Property<string>("Certificate")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("certificate");

                    b.Property<long>("FreelancerId")
                        .HasColumnType("bigint")
                        .HasColumnName("freelancer_id");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.Property<string>("Works")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("works");

                    b.HasKey("PortfolioId");

                    b.HasIndex("FreelancerId")
                        .IsUnique();

                    b.ToTable("Portfolio");
                });

            modelBuilder.Entity("BusinessObjects.Models.Project", b =>
                {
                    b.Property<long>("ProjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("project_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ProjectId"));

                    b.Property<int>("AvailableTimeRange")
                        .HasColumnType("integer")
                        .HasColumnName("available_time_range");

                    b.Property<long>("ClientId")
                        .HasColumnType("bigint")
                        .HasColumnName("client_id");

                    b.Property<decimal>("EstimateBudget")
                        .HasColumnType("numeric")
                        .HasColumnName("estimate_budget");

                    b.Property<long?>("FreelancerId")
                        .HasColumnType("bigint")
                        .HasColumnName("freelancer_id");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("location");

                    b.Property<DateTime>("PostDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("post_date");

                    b.Property<string>("ProjectDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("project_description");

                    b.Property<string>("ProjectName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("project_name");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<long?>("VerifyStaffId")
                        .HasColumnType("bigint")
                        .HasColumnName("verify_staff_id");

                    b.HasKey("ProjectId");

                    b.HasIndex("ClientId");

                    b.HasIndex("FreelancerId");

                    b.HasIndex("VerifyStaffId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("BusinessObjects.Models.Report", b =>
                {
                    b.Property<long>("ReportId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("report_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ReportId"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<long>("ProjectId")
                        .HasColumnType("bigint")
                        .HasColumnName("project_id");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("reason");

                    b.Property<long>("SenderId")
                        .HasColumnType("bigint")
                        .HasColumnName("sender_id");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<long>("VerifyStaffId")
                        .HasColumnType("bigint")
                        .HasColumnName("verify_staff_id");

                    b.HasKey("ReportId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("SenderId");

                    b.HasIndex("VerifyStaffId");

                    b.ToTable("Report");
                });

            modelBuilder.Entity("BusinessObjects.Models.RoomDetail", b =>
                {
                    b.Property<long>("ChatRoomId")
                        .HasColumnType("bigint")
                        .HasColumnName("chat_room_id");

                    b.Property<long>("AccountId")
                        .HasColumnType("bigint")
                        .HasColumnName("account_id");

                    b.HasKey("ChatRoomId", "AccountId");

                    b.HasIndex("AccountId");

                    b.ToTable("RoomDetail");
                });

            modelBuilder.Entity("BusinessObjects.Models.SkillCategory", b =>
                {
                    b.Property<long>("SkillId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("skill_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("SkillId"));

                    b.Property<string>("SkillName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("skill_name");

                    b.HasKey("SkillId");

                    b.ToTable("SkillCategory");
                });

            modelBuilder.Entity("BusinessObjects.Models.SkillPerform", b =>
                {
                    b.Property<long>("AccountId")
                        .HasColumnType("bigint")
                        .HasColumnName("account_id");

                    b.Property<long>("SkillId")
                        .HasColumnType("bigint")
                        .HasColumnName("skill_id");

                    b.HasKey("AccountId");

                    b.HasIndex("SkillId");

                    b.ToTable("SkillPerform");
                });

            modelBuilder.Entity("BusinessObjects.Models.SkillRequired", b =>
                {
                    b.Property<long>("ProjectId")
                        .HasColumnType("bigint")
                        .HasColumnName("project_id");

                    b.Property<long>("SkillId")
                        .HasColumnType("bigint")
                        .HasColumnName("skill_id");

                    b.HasKey("ProjectId");

                    b.HasIndex("SkillId");

                    b.ToTable("SkillRequired");
                });

            modelBuilder.Entity("BusinessObjects.Models.Transaction", b =>
                {
                    b.Property<long>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("transaction_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("TransactionId"));

                    b.Property<long>("AccountId")
                        .HasColumnType("bigint")
                        .HasColumnName("account_id");

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric")
                        .HasColumnName("amount");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("type");

                    b.HasKey("TransactionId");

                    b.HasIndex("AccountId");

                    b.ToTable("Transaction");
                });

            modelBuilder.Entity("BusinessObjects.Models.Bid", b =>
                {
                    b.HasOne("BusinessObjects.Models.Account", "BidOwner")
                        .WithMany("Bids")
                        .HasForeignKey("BidOwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BidOwner");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("BusinessObjects.Models.Contract", b =>
                {
                    b.HasOne("BusinessObjects.Models.Project", "Project")
                        .WithMany("Contracts")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("BusinessObjects.Models.Feedback", b =>
                {
                    b.HasOne("BusinessObjects.Models.Project", "Project")
                        .WithMany("Feedbacks")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("BusinessObjects.Models.Messages", b =>
                {
                    b.HasOne("BusinessObjects.Models.ChatRoom", "ChatRoom")
                        .WithMany("Messages")
                        .HasForeignKey("ChatRoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Models.Account", "Sender")
                        .WithMany("Messages")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ChatRoom");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("BusinessObjects.Models.Milestone", b =>
                {
                    b.HasOne("BusinessObjects.Models.Project", "Project")
                        .WithMany("Milestones")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("BusinessObjects.Models.Notification", b =>
                {
                    b.HasOne("BusinessObjects.Models.Account", "Account")
                        .WithMany("Notifications")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("BusinessObjects.Models.Portfolio", b =>
                {
                    b.HasOne("BusinessObjects.Models.Account", "Account")
                        .WithOne("Portfolio")
                        .HasForeignKey("BusinessObjects.Models.Portfolio", "FreelancerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("BusinessObjects.Models.Project", b =>
                {
                    b.HasOne("BusinessObjects.Models.Account", "Client")
                        .WithMany("ClientProjects")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Models.Account", "Freelancer")
                        .WithMany("FreelancerProjects")
                        .HasForeignKey("FreelancerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("BusinessObjects.Models.Account", "Verifier")
                        .WithMany("VerifyStaffIdProjects")
                        .HasForeignKey("VerifyStaffId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Client");

                    b.Navigation("Freelancer");

                    b.Navigation("Verifier");
                });

            modelBuilder.Entity("BusinessObjects.Models.Report", b =>
                {
                    b.HasOne("BusinessObjects.Models.Project", "Project")
                        .WithMany("Reports")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Models.Account", "Sender")
                        .WithMany("SenderReports")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Models.Account", "VerifyStaff")
                        .WithMany("VerifiedReports")
                        .HasForeignKey("VerifyStaffId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("Sender");

                    b.Navigation("VerifyStaff");
                });

            modelBuilder.Entity("BusinessObjects.Models.RoomDetail", b =>
                {
                    b.HasOne("BusinessObjects.Models.Account", "Account")
                        .WithMany("RoomDetails")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Models.ChatRoom", "ChatRooms")
                        .WithMany("RoomDetails")
                        .HasForeignKey("ChatRoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("ChatRooms");
                });

            modelBuilder.Entity("BusinessObjects.Models.SkillPerform", b =>
                {
                    b.HasOne("BusinessObjects.Models.Account", "Account")
                        .WithMany("SkillPerforms")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Models.SkillCategory", "SkillCategory")
                        .WithMany("SkillPerforms")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("SkillCategory");
                });

            modelBuilder.Entity("BusinessObjects.Models.SkillRequired", b =>
                {
                    b.HasOne("BusinessObjects.Models.Project", "Project")
                        .WithMany("SkillRequired")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Models.SkillCategory", "SkillCategory")
                        .WithMany("SkillRequired")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("SkillCategory");
                });

            modelBuilder.Entity("BusinessObjects.Models.Transaction", b =>
                {
                    b.HasOne("BusinessObjects.Models.Account", "Account")
                        .WithMany("Transactions")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("BusinessObjects.Models.Account", b =>
                {
                    b.Navigation("Bids");

                    b.Navigation("ClientProjects");

                    b.Navigation("FreelancerProjects");

                    b.Navigation("Messages");

                    b.Navigation("Notifications");

                    b.Navigation("Portfolio");

                    b.Navigation("RoomDetails");

                    b.Navigation("SenderReports");

                    b.Navigation("SkillPerforms");

                    b.Navigation("Transactions");

                    b.Navigation("VerifiedReports");

                    b.Navigation("VerifyStaffIdProjects");
                });

            modelBuilder.Entity("BusinessObjects.Models.ChatRoom", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("RoomDetails");
                });

            modelBuilder.Entity("BusinessObjects.Models.Project", b =>
                {
                    b.Navigation("Contracts");

                    b.Navigation("Feedbacks");

                    b.Navigation("Milestones");

                    b.Navigation("Reports");

                    b.Navigation("SkillRequired");
                });

            modelBuilder.Entity("BusinessObjects.Models.SkillCategory", b =>
                {
                    b.Navigation("SkillPerforms");

                    b.Navigation("SkillRequired");
                });
#pragma warning restore 612, 618
        }
    }
}
