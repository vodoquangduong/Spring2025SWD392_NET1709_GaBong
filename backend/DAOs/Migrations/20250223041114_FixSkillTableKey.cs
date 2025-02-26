using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAOs.Migrations
{
    /// <inheritdoc />
    public partial class FixSkillTableKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SkillRequired",
                table: "SkillRequired");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SkillPerform",
                table: "SkillPerform");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SkillRequired",
                table: "SkillRequired",
                columns: new[] { "project_id", "skill_id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SkillPerform",
                table: "SkillPerform",
                columns: new[] { "account_id", "skill_id" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SkillRequired",
                table: "SkillRequired");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SkillPerform",
                table: "SkillPerform");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SkillRequired",
                table: "SkillRequired",
                column: "project_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SkillPerform",
                table: "SkillPerform",
                column: "account_id");
        }
    }
}
