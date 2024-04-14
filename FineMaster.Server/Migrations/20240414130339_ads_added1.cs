using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FineMaster.Server.Migrations
{
    /// <inheritdoc />
    public partial class ads_added1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Ads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ads_UserID",
                table: "Ads",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Users_UserID",
                table: "Ads",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Users_UserID",
                table: "Ads");

            migrationBuilder.DropIndex(
                name: "IX_Ads_UserID",
                table: "Ads");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Ads");
        }
    }
}
