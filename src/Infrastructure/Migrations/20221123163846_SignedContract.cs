using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContractdocIO.Infrastructure.Migrations
{
    public partial class SignedContract : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SignedContract",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContractId = table.Column<int>(type: "int", nullable: false),
                    ReferenceCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReceivedByEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReceivedByUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Signature = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SignedContract", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SignedContract_AspNetUsers_ReceivedByUserId",
                        column: x => x.ReceivedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SignedContract_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CheckOption",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OptionId = table.Column<int>(type: "int", nullable: false),
                    SignedContractId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    IsChecked = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CheckOption_Options_OptionId",
                        column: x => x.OptionId,
                        principalTable: "Options",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CheckOption_SignedContract_SignedContractId",
                        column: x => x.SignedContractId,
                        principalTable: "SignedContract",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CheckOption_OptionId",
                table: "CheckOption",
                column: "OptionId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckOption_SignedContractId",
                table: "CheckOption",
                column: "SignedContractId");

            migrationBuilder.CreateIndex(
                name: "IX_SignedContract_ContractId",
                table: "SignedContract",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_SignedContract_ReceivedByUserId",
                table: "SignedContract",
                column: "ReceivedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SignedContract_ReferenceCode",
                table: "SignedContract",
                column: "ReferenceCode",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CheckOption");

            migrationBuilder.DropTable(
                name: "SignedContract");
        }
    }
}
