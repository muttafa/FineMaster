using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FineMaster.Server.Migrations
{
    /// <inheritdoc />
    public partial class ads_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdID",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "City",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "District",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserImage",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Ads",
                columns: table => new
                {
                    AdID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdSummary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ads", x => x.AdID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ads");

            migrationBuilder.DropColumn(
                name: "AdID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "District",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserImage",
                table: "Users");
        }
    }
}
