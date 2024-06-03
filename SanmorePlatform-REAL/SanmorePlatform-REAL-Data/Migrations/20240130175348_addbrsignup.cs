using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SanmorePlatform_REAL_Data.Migrations
{
    public partial class addbrsignup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          
            migrationBuilder.CreateTable(
                name: "tblBrokerSignUp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MainRole = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SocialMedia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BusinessAddress1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessAddress2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZipCode = table.Column<int>(type: "int", nullable: false),
                    NumberOfDeals = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HelpGetMoreDeals = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FeatureYouLikeToSee = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IntrestedInUploadInventory = table.Column<bool>(type: "bit", nullable: false),
                    IdentificationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBrokerSignUp", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBrokerSignUp_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBrokerSignUp_UserId",
                table: "tblBrokerSignUp",
                column: "UserId");
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblBrokerSignUp");
        }
    }
}
