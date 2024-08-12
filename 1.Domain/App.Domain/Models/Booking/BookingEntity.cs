using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class BookingEntity : BaseEntity<Guid>
    {


        [MaxLength(50), Column(Order = 2), Comment("เลขที่การจอง")]
        public string? bookingNumber { get; set; }

        [ForeignKey("customerId")]
        public CustomerEntity? Customer_customerId { get; set; }

        [Column(Order = 3), Comment("ลูกค้า")]
        public Guid? customerId { get; set; }

        [Column(Order = 4), Comment("วันที่จอง")]
        public DateTime? bookingDate { get; set; }

        [Column(Order = 5), Comment("วันที่นัดซ่อม")]
        public DateTime? scheduledRepairDate { get; set; }

        [Column(Order = 6), Comment("ราคาประเมิน หน่วยเป็น EA")]
        public int? estimatedCost { get; set; }

        [Column(Order = 7), Comment("Confirm แล้ว")]
        public bool? isConfirm { get; set; }

        [MaxLength(1000), Column(Order = 8), Comment("ชื่อยานอวกาศ")]
        public string? spacecraftName { get; set; }

        [MaxLength(1000), Column(Order = 9), Comment("รุ่นของยานอวกาศ")]
        public string? model { get; set; }

        [MaxLength(1000), Column(Order = 10), Comment("ผู้ผลิตยานอวกาศ")]
        public string? manufacturer { get; set; }

        [Column(Order = 11), Comment("ปีที่ผลิต")]
        public string? yearOfManufacture { get; set; }

        [MaxLength(50), Column(Order = 12), Comment("หมายเลขทะเบียนยานอวกาศ")]
        public string? registrationNumber { get; set; }

        [Column(Order = 13), Comment("ความจุหรือจำนวนผู้โดยสารที่รองรับได้")]
        public int? capacity { get; set; }

        [MaxLength(4000), Column(Order = 14), Comment("หมายเหตุเพิ่มเติมเกี่ยวกับยาน")]
        public string? spacecraftNotes { get; set; }

        [MaxLength(4000), Column(Order = 15), Comment("หมายเหตุ การ Booking")]
        public string? bookingNotes { get; set; }

        [MaxLength(1000), Column(Order = 16), Comment("รูปถ่ายยาน 1")]
        public string? spacecraftImage1 { get; set; }

        [NotMapped]
        public string spacecraftImage1Display
        {
            get
            {
                return (string.IsNullOrEmpty(spacecraftImage1) ? "" :
                    FileUtil.GetFileInfo(TTSW.Constant.FilePathConstant.DirType.FilesTestUpload, id, spacecraftImage1).RelativePath).Replace(@"\", "/");
            }
        }

        [MaxLength(1000), Column(Order = 17), Comment("รูปถ่ายยาน 2")]
        public string? spacecraftImage2 { get; set; }

        [NotMapped]
        public string spacecraftImage2Display
        {
            get
            {
                return (string.IsNullOrEmpty(spacecraftImage2) ? "" :
                    FileUtil.GetFileInfo(TTSW.Constant.FilePathConstant.DirType.FilesTestUpload, id, spacecraftImage2).RelativePath).Replace(@"\", "/");
            }
        }

        [MaxLength(1000), Column(Order = 18), Comment("รูปถ่ายยาน 3")]
        public string? spacecraftImage3 { get; set; }

        [NotMapped]
        public string spacecraftImage3Display
        {
            get
            {
                return (string.IsNullOrEmpty(spacecraftImage3) ? "" :
                    FileUtil.GetFileInfo(TTSW.Constant.FilePathConstant.DirType.FilesTestUpload, id, spacecraftImage3).RelativePath).Replace(@"\", "/");
            }
        }

        [ForeignKey("staffId")]
        public UserEntity? User_staffId { get; set; }

        [Column(Order = 19), Comment("ผู้ดูแลลูกค้า")]
        public Guid? staffId { get; set; }


        public List<RepairEntity> Repairs { get; } = new();


    }
}
