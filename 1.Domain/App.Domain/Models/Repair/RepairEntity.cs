using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class RepairEntity : BaseEntity<Guid>
    {


        [ForeignKey("bookingId")]
        public BookingEntity? Booking_bookingId { get; set; }

        [Column(Order = 2), Comment("Booking")]
        public Guid? bookingId { get; set; }

        [MaxLength(50), Column(Order = 3), Comment("เลขที่การซ่อม")]
        public string? repairCode { get; set; }

        [ForeignKey("technicianId")]
        public UserEntity? User_technicianId { get; set; }

        [Column(Order = 4), Comment("ช่างซ่อม")]
        public Guid? technicianId { get; set; }

        [Column(Order = 5), Comment("วันที่เริ่มซ่อม")]
        public DateTime? startDate { get; set; }

        [Column(Order = 6), Comment("วันที่ซ่อมเสร็จ")]
        public DateTime? endDate { get; set; }

        [Column(Order = 7), Comment("มูลค่าการซ่อมเป็นหน่วย EA")]
        public int? totalCostEA { get; set; }

        [MaxLength(4000), Column(Order = 8), Comment("หมายเหตุการซ่อม")]
        public string? repairNote { get; set; }


        public List<PaymentEntity> Payments { get; } = new();


    }
}
