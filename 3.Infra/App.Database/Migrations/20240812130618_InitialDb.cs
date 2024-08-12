using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App.Database.Migrations
{
    /// <inheritdoc />
    public partial class InitialDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    name = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ชื่อลูกค้า"),
                    contactInfo = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "ข้อมูลติดต่อ"),
                    address = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "ที่อยู่"),
                    username = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "ชื่อผู้ใช้งาน"),
                    password = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "รหัสผ่าน"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    nickname = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ชื่อเรียก"),
                    fullname = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ชื่อเต็ม"),
                    phone = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "โทรศัพท์"),
                    email = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "อีเมล/username"),
                    password = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "รหัสผ่าน"),
                    isCustomerService = table.Column<bool>(type: "boolean", nullable: true, comment: "เป็น ผู้ดูแลลูกค้า"),
                    isTechnician = table.Column<bool>(type: "boolean", nullable: true, comment: "เป็น ช่างซ่อม"),
                    isAdministrator = table.Column<bool>(type: "boolean", nullable: true, comment: "เป็น Admin"),
                    isInventoryManager = table.Column<bool>(type: "boolean", nullable: true, comment: "เป็น ผู้จัดการคลังสินค้า"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    bookingNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "เลขที่การจอง"),
                    customerId = table.Column<Guid>(type: "uuid", nullable: true, comment: "ลูกค้า"),
                    bookingDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "วันที่จอง"),
                    scheduledRepairDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "วันที่นัดซ่อม"),
                    estimatedCost = table.Column<int>(type: "integer", nullable: true, comment: "ราคาประเมิน หน่วยเป็น EA"),
                    isConfirm = table.Column<bool>(type: "boolean", nullable: true, comment: "Confirm แล้ว"),
                    spacecraftName = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ชื่อยานอวกาศ"),
                    model = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "รุ่นของยานอวกาศ"),
                    manufacturer = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "ผู้ผลิตยานอวกาศ"),
                    yearOfManufacture = table.Column<string>(type: "text", nullable: true, comment: "ปีที่ผลิต"),
                    registrationNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "หมายเลขทะเบียนยานอวกาศ"),
                    capacity = table.Column<int>(type: "integer", nullable: true, comment: "ความจุหรือจำนวนผู้โดยสารที่รองรับได้"),
                    spacecraftNotes = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "หมายเหตุเพิ่มเติมเกี่ยวกับยาน"),
                    bookingNotes = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "หมายเหตุ การ Booking"),
                    spacecraftImage1 = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "รูปถ่ายยาน 1"),
                    spacecraftImage2 = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "รูปถ่ายยาน 2"),
                    spacecraftImage3 = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "รูปถ่ายยาน 3"),
                    staffId = table.Column<Guid>(type: "uuid", nullable: true, comment: "ผู้ดูแลลูกค้า"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.id);
                    table.ForeignKey(
                        name: "FK_Bookings_Customers_customerId",
                        column: x => x.customerId,
                        principalTable: "Customers",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Bookings_Users_staffId",
                        column: x => x.staffId,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Repairs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    bookingId = table.Column<Guid>(type: "uuid", nullable: true, comment: "Booking"),
                    repairCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "เลขที่การซ่อม"),
                    technicianId = table.Column<Guid>(type: "uuid", nullable: true, comment: "ช่างซ่อม"),
                    startDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "วันที่เริ่มซ่อม"),
                    endDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "วันที่ซ่อมเสร็จ"),
                    totalCostEA = table.Column<int>(type: "integer", nullable: true, comment: "มูลค่าการซ่อมเป็นหน่วย EA"),
                    repairNote = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "หมายเหตุการซ่อม"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Repairs", x => x.id);
                    table.ForeignKey(
                        name: "FK_Repairs_Bookings_bookingId",
                        column: x => x.bookingId,
                        principalTable: "Bookings",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Repairs_Users_technicianId",
                        column: x => x.technicianId,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, comment: "คีร์ของข้อมูล"),
                    repairId = table.Column<Guid>(type: "uuid", nullable: true, comment: "เอกสารซ่อม"),
                    amountEA = table.Column<int>(type: "integer", nullable: true, comment: "จำนวนเงินที่ชำระเป็นหน่วย EA"),
                    documentCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "เลขที่ใบชำระเงิน"),
                    paymentMethod = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true, comment: "วิธีชำระเงิน"),
                    exchangeItems = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "รายการสิ่งของที่ใช้ในการแลกเปลี่ยน"),
                    paymentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "วันที่ชำระ"),
                    paymentNote = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "หมายเหตุการชำระ"),
                    created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาสร้าง"),
                    updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "เวลาปรับปรุงล่าสุด"),
                    isActive = table.Column<bool>(type: "boolean", nullable: true, comment: "ใช้งานได้หรือไม่")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.id);
                    table.ForeignKey(
                        name: "FK_Payments_Repairs_repairId",
                        column: x => x.repairId,
                        principalTable: "Repairs",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_customerId",
                table: "Bookings",
                column: "customerId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_staffId",
                table: "Bookings",
                column: "staffId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_repairId",
                table: "Payments",
                column: "repairId");

            migrationBuilder.CreateIndex(
                name: "IX_Repairs_bookingId",
                table: "Repairs",
                column: "bookingId");

            migrationBuilder.CreateIndex(
                name: "IX_Repairs_technicianId",
                table: "Repairs",
                column: "technicianId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Repairs");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
