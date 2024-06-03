using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SanmorePlatform_REAL_Data.Migrations
{
    public partial class addOffercontractform : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblOfferContract",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NameOfBuyingEntity = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Address1 = table.Column<string>(type: "nvarchar(900)", nullable: true),
                    Address2 = table.Column<string>(type: "nvarchar(900)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(900)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(900)", nullable: true),
                    ZipCode = table.Column<int>(type: "int", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(900)", nullable: true),
                    PurchasePrice = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DueDiligencePeriod = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ClosingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LoanExitStrategy = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RefiLenderName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Other = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProofOfFundsFile = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblOfferContract", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblOfferContract_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
            migrationBuilder.CreateIndex(
                name: "IX_tblOfferContract_UserId",
                table: "tblOfferContract",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblOfferContract");
        }
    }
}
