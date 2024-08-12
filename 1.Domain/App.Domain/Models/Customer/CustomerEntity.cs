using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class CustomerEntity : BaseEntity<Guid>
    {


        [MaxLength(1000), Column(Order = 2), Comment("ชื่อลูกค้า")]
        public string? name { get; set; }

        [MaxLength(4000), Column(Order = 3), Comment("ข้อมูลติดต่อ")]
        public string? contactInfo { get; set; }

        [MaxLength(4000), Column(Order = 4), Comment("ที่อยู่")]
        public string? address { get; set; }

        [MaxLength(50), Column(Order = 5), Comment("ชื่อผู้ใช้งาน")]
        public string? username { get; set; }

        [MaxLength(50), Column(Order = 6), Comment("รหัสผ่าน")]
        public string? password { get; set; }


        public List<BookingEntity> Bookings { get; } = new();


    }
}
