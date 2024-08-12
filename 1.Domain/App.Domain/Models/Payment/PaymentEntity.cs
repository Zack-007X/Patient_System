using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class PaymentEntity : BaseEntity<Guid>
    {


        [ForeignKey("repairId")]
        public RepairEntity? Repair_repairId { get; set; }

        [Column(Order = 2), Comment("เอกสารซ่อม")]
        public Guid? repairId { get; set; }

        [Column(Order = 3), Comment("จำนวนเงินที่ชำระเป็นหน่วย EA")]
        public int? amountEA { get; set; }

        [MaxLength(50), Column(Order = 4), Comment("เลขที่ใบชำระเงิน")]
        public string? documentCode { get; set; }

        [MaxLength(255), Column(Order = 5), Comment("วิธีชำระเงิน")]
        public string? paymentMethod { get; set; }

        [MaxLength(4000), Column(Order = 6), Comment("รายการสิ่งของที่ใช้ในการแลกเปลี่ยน")]
        public string? exchangeItems { get; set; }

        [Column(Order = 7), Comment("วันที่ชำระ")]
        public DateTime? paymentDate { get; set; }

        [MaxLength(4000), Column(Order = 8), Comment("หมายเหตุการชำระ")]
        public string? paymentNote { get; set; }




    }
}
